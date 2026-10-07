import { error, redirect } from "@sveltejs/kit";
import { createClient } from "@supabase/supabase-js";
import { p as public_env, b as private_env } from "../../../chunks/shared-server.js";
const supabaseAdmin = createClient(
  public_env.PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  private_env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
const load = async ({ url, locals }) => {
  const shopId = url.searchParams.get("shop");
  const token = url.searchParams.get("token");
  const missingParams = !shopId || !token;
  const { session } = await locals.safeGetSession();
  if (!session) {
    return {
      authenticated: false,
      missingParams,
      shopId,
      token
    };
  }
  return {
    authenticated: true,
    missingParams,
    shopId,
    token
  };
};
const actions = {
  claim: async ({ request, locals }) => {
    const data = await request.formData();
    const shopId = data.get("shopId");
    data.get("token");
    const { session, user } = await locals.safeGetSession();
    if (!session || !user) {
      throw error(401, "You must be logged in to claim points.");
    }
    if (!shopId) {
      throw error(400, "Invalid shop.");
    }
    const pointsToAward = 10;
    if (supabaseAdmin.supabaseUrl && supabaseAdmin.supabaseUrl.includes("placeholder")) {
      console.log("Demo Mode: Bypassing actual database point claim");
    } else {
      const { error: rpcError } = await supabaseAdmin.rpc("award_points", {
        p_user_id: user.id,
        p_shop_id: shopId,
        p_points: pointsToAward
      });
      if (rpcError) {
        console.error("Error awarding points:", rpcError);
        throw error(500, "Failed to claim points.");
      }
    }
    throw redirect(303, "/dashboard?claim=success");
  }
};
export {
  actions,
  load
};
