import { redirect } from "@sveltejs/kit";
const load = async ({ locals }) => {
  const { session, user } = await locals.safeGetSession();
  const supabase = locals.supabase;
  if (!session) {
    throw redirect(303, "/claim");
  }
  if (supabase.supabaseUrl && supabase.supabaseUrl.includes("placeholder")) {
    return {
      user,
      balances: [{ points_balance: 10, shops: { id: "sample", name: "Demo Coffee Shop" } }],
      transactions: [{ points_changed: 10, type: "EARNED", created_at: (/* @__PURE__ */ new Date()).toISOString(), shops: { name: "Demo Coffee Shop" } }]
    };
  }
  const { data: balances, error: balancesError } = await supabase.from("loyalty_balances").select("points_balance, shops(id, name)").eq("user_id", user.id);
  const { data: transactions, error: txError } = await supabase.from("point_transactions").select("points_changed, type, created_at, shops(name)").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10);
  return {
    user,
    balances: balances || [],
    transactions: transactions || []
  };
};
const actions = {
  signout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut();
    throw redirect(303, "/");
  }
};
export {
  actions,
  load
};
