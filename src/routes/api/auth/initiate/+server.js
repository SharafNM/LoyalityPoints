import { json } from '@sveltejs/kit';

/**
 * POST /api/auth/initiate
 *
 * Detects whether the email belongs to an existing or new user:
 * - Existing  → sends an OTP code (verified inline)
 * - New user  → sends a confirmation link (emailRedirectTo /auth/confirm)
 *
 * Returns: { flow: 'signup' | 'login' }
 */
export const POST = async ({ request, locals: { supabase }, url }) => {
	const { email } = await request.json();

	if (!email) {
		return json({ error: 'Email is required' }, { status: 400 });
	}

	const origin = url.origin;

	// Existing user only — if they don't exist, Supabase returns an error.
	const { error: existingError } = await supabase.auth.signInWithOtp({
		email,
		options: { shouldCreateUser: false }
	});

	if (!existingError) {
		// User exists — an OTP code was sent to their email
		return json({ flow: 'login' });
	}

	// New user — register them and send a confirmation link
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

	return json({ flow: 'signup' });
};
