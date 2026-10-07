import { json } from "@sveltejs/kit";
const POST = async ({ request, locals: { supabase } }) => {
  const { email, token } = await request.json();
  if (!email || !token) {
    return json({ error: "Email and code are required" }, { status: 400 });
  }
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email"
  });
  if (error) {
    return json({ error: error.message }, { status: 400 });
  }
  return json({ ok: true });
};
export {
  POST
};
