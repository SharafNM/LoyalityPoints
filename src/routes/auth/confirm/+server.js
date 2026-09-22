import { redirect } from '@sveltejs/kit';

/**
 * Handles the email verification/confirmation callback from Supabase.
 * Supabase redirects here after the user clicks the verification link in their email.
 * The URL looks like: /auth/confirm?token_hash=xxx&type=email
 *
 * IMPORTANT: We must NOT use SvelteKit's `redirect()` helper here because it throws
 * before the Supabase SSR client can write the auth cookies onto the response.
 * Instead we return a plain Response with a Location header so the cookies are
 * attached first and the browser receives them with the redirect.
 */
export const GET = async ({ url, cookies, locals: { supabase } }) => {
	const token_hash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type');
	const next = url.searchParams.get('next') ?? '/';

	if (token_hash && type) {
		const { error } = await supabase.auth.verifyOtp({ token_hash, type });

		if (!error) {
			// The Supabase SSR client has already written the session cookies via
			// the setAll hook in hooks.server.js. Return the redirect as a plain
			// Response so those Set-Cookie headers are included in the response.
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

