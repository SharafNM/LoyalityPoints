import "@sveltejs/kit";
const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code");
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const next = url.searchParams.get("next") ?? "/";
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return new Response(null, {
        status: 303,
        headers: { Location: next }
      });
    }
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      return new Response(null, {
        status: 303,
        headers: { Location: next }
      });
    }
  }
  return new Response(null, {
    status: 303,
    headers: { Location: "/?error=confirmation_failed" }
  });
};
export {
  GET
};
