import { json } from "@sveltejs/kit";
const POST = async ({ request, locals: { supabase }, url }) => {
  const { email } = await request.json();
  if (!email) {
    return json({ error: "Email is required" }, { status: 400 });
  }
  const origin = url.origin;
  const { error: existingError } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false }
  });
  if (!existingError) {
    return json({ flow: "login" });
  }
  const { error: signupError } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${origin}/auth/confirm`
    }
  });
  if (signupError) {
    return json({ error: signupError.message }, { status: 400 });
  }
  return json({ flow: "signup" });
};
export {
  POST
};
