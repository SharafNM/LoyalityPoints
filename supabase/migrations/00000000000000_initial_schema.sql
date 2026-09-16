-- Create Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Shops Table
CREATE TABLE shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  latitude FLOAT8,
  longitude FLOAT8,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Loyalty Balances Table
CREATE TABLE loyalty_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  shop_id UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  points_balance INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, shop_id)
);

-- Create Rewards Table
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  points_required INTEGER NOT NULL
);

-- Create Point Transactions Table
CREATE TYPE transaction_type AS ENUM ('EARNED', 'REDEEMED');

CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  shop_id UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  points_changed INTEGER NOT NULL,
  type transaction_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can view their own profile, or shop owners can view profiles of their customers. For simplicity, any authenticated user can view, but only self can update.
CREATE POLICY "Users can view any profile" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- Shops: Anyone can view, only owners can update.
CREATE POLICY "Anyone can view shops" ON shops FOR SELECT TO authenticated USING (true);
CREATE POLICY "Owners can update own shops" ON shops FOR UPDATE TO authenticated USING (owner_id = auth.uid());
CREATE POLICY "Owners can insert own shops" ON shops FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());

-- Loyalty Balances: Users can view their own, shop owners can view for their shop.
CREATE POLICY "Users can view own balances" ON loyalty_balances FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Shop owners can view balances for their shop" ON loyalty_balances FOR SELECT TO authenticated USING (
  shop_id IN (SELECT id FROM shops WHERE owner_id = auth.uid())
);

-- Rewards: Anyone can view, only shop owners can update.
CREATE POLICY "Anyone can view rewards" ON rewards FOR SELECT TO authenticated USING (true);
CREATE POLICY "Shop owners can manage rewards" ON rewards FOR ALL TO authenticated USING (
  shop_id IN (SELECT id FROM shops WHERE owner_id = auth.uid())
);

-- Point Transactions: Users can view own, shop owners can view for their shop.
CREATE POLICY "Users can view own transactions" ON point_transactions FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Shop owners can view transactions for their shop" ON point_transactions FOR SELECT TO authenticated USING (
  shop_id IN (SELECT id FROM shops WHERE owner_id = auth.uid())
);

-- RPC for securely awarding points
CREATE OR REPLACE FUNCTION award_points(p_user_id UUID, p_shop_id UUID, p_points INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- We use SECURITY DEFINER so the function bypasses RLS, but we need to check permissions inside.
  -- Only allow if the caller is the shop owner (or if you want to allow it via server-side action with service role, 
  -- you can remove the check, but assuming it's called by shop owner or server with user context):
  -- Wait, the prompt says "securely add points and create transaction records inside a single atomic database lock."
  
  -- Check if caller is the shop owner (if called directly by client)
  -- Or if called by service role, this will be skipped if we just rely on RLS, but since it's SECURITY DEFINER,
  -- we should ideally verify. Let's do a basic check. 
  -- We'll assume the server action handles authorization and uses service role, 
  -- but to be safe, if called by authenticated user, must be shop owner.
  IF auth.role() = 'authenticated' THEN
    IF NOT EXISTS (SELECT 1 FROM shops WHERE id = p_shop_id AND owner_id = auth.uid()) THEN
      RAISE EXCEPTION 'Not authorized to award points for this shop';
    END IF;
  END IF;

  -- Lock the balance row for update to prevent race conditions
  INSERT INTO loyalty_balances (user_id, shop_id, points_balance)
  VALUES (p_user_id, p_shop_id, p_points)
  ON CONFLICT (user_id, shop_id) 
  DO UPDATE SET points_balance = loyalty_balances.points_balance + p_points;
  
  -- Insert transaction
  INSERT INTO point_transactions (user_id, shop_id, points_changed, type)
  VALUES (p_user_id, p_shop_id, p_points, 'EARNED');
END;
$$;
