import { redirect } from '@sveltejs/kit';

/**
 * Handles the email verification/confirmation callback from Supabase.
 * Supabase redirects here after the user clicks the verification link in their email.
 * With @supabase/ssr (PKCE) the URL looks like: /auth/confirm?code=xxx
 *
 * IMPORTANT: We must NOT use SvelteKit's `redirect()` helper here because it throws
 * before the Supabase SSR client can write the auth cookies onto the response.
 * Instead we return a plain Response with a Location header so the cookies are
 * attached first and the browser receives them with the redirect.
 */
export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	const token_hash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type');
	const next = url.searchParams.get('next') ?? '/';

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

	// Something went wrong — send the user back to login
	return new Response(null, {
		status: 303,
		headers: { Location: '/?error=confirmation_failed' }
	});
};

