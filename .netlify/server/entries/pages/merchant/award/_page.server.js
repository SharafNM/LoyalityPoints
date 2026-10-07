import { error, redirect } from "@sveltejs/kit";
const load = async ({ url, locals }) => {
  const { session, user } = await locals.safeGetSession();
  const supabase = locals.supabase;
  const customerId = url.searchParams.get("customer");
  if (!session) {
    throw redirect(303, "/?redirect=" + encodeURIComponent(url.pathname + url.search));
  }
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") {
    throw redirect(303, "/dashboard");
  }
  const { data: shop } = await supabase.from("shops").select("*").eq("owner_id", user.id).single();
  let customer = null;
  if (customerId) {
    const { data } = await supabase.from("profiles").select("id, full_name, phone").eq("id", customerId).single();
    customer = data;
  }
  return {
    shop,
    customer,
    customerId,
    success: url.searchParams.get("success")
  };
};
const actions = {
  award: async ({ request, locals }) => {
    const { session, user } = await locals.safeGetSession();
    const supabase = locals.supabase;
    if (!session || !user) {
      throw error(401, "You must be signed in to award points.");
    }
    const form = await request.formData();
    const customerId = form.get("customerId");
    const points = parseInt(form.get("points"), 10);
    if (!customerId || !points || points <= 0) {
      throw error(400, "Invalid customer or points.");
    }
    const { data: shop } = await supabase.from("shops").select("id").eq("owner_id", user.id).single();
    if (!shop) {
      throw error(403, "You do not own a shop.");
    }
    const { error: rpcError } = await supabase.rpc("award_points", {
      p_user_id: customerId,
      p_shop_id: shop.id,
      p_points: points
    });
    if (rpcError) {
      throw error(500, rpcError.message);
    }
    throw redirect(303, `/merchant/award?customer=${customerId}&success=${points}`);
  }
};
export {
  actions,
  load
};
