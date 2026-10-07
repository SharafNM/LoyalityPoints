import { redirect } from "@sveltejs/kit";
const load = async ({ locals }) => {
  const { session, user } = await locals.safeGetSession();
  const supabase = locals.supabase;
  if (session) {
    if (supabase.supabaseUrl && supabase.supabaseUrl.includes("placeholder")) {
      throw redirect(303, "/dashboard");
    }
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role === "admin") {
      throw redirect(303, "/merchant");
    } else {
      throw redirect(303, "/dashboard");
    }
  }
  return {
    authenticated: false
  };
};
export {
  load
};
