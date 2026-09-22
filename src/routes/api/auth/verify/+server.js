import { json } from '@sveltejs/kit';

/**
 * POST /api/auth/verify
 *
 * Verifies the 6/8-digit OTP on the server so the session cookie is set by
 * the server (via event.cookies in hooks.server.js), which reliably replaces
 * any stale session and is immediately readable by subsequent server loads.
 */
export const POST = async ({ request, locals: { supabase } }) => {
	const { email, token } = await request.json();

	if (!email || !token) {
		return json({ error: 'Email and code are required' }, { status: 400 });
	}

	const { error } = await supabase.auth.verifyOtp({
		email,
		token,
		type: 'email'
	});

	if (error) {
		return json({ error: error.message }, { status: 400 });
	}

	return json({ ok: true });
};
