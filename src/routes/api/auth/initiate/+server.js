import { json } from '@sveltejs/kit';

/**
 * POST /api/auth/initiate
 * 
 * Detects whether the email belongs to an existing or new user, then:
 * - New user  → sends a magic link confirmation email (emailRedirectTo /auth/confirm)
 * - Existing  → sends a 6-digit OTP code email (no redirect, verified inline)
 *
 * Returns: { flow: 'signup' | 'login' }
 */
export const POST = async ({ request, locals: { supabase }, url }) => {
	const { email } = await request.json();

	if (!email) {
		return json({ error: 'Email is required' }, { status: 400 });
	}

	const origin = url.origin; // e.g. http://localhost:5173

	// Try to sign in an EXISTING user only (shouldCreateUser: false).
	// If the user doesn't exist Supabase returns an error.
	const { error: existingError } = await supabase.auth.signInWithOtp({
		email,
		options: { shouldCreateUser: false }
	});

	if (existingError) {
		// User not found — register them with a confirmation magic link
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
	}

	// User exists — a 6-digit OTP code was sent to their email
	return json({ flow: 'login' });
};
