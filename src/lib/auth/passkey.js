import { supabase } from '$lib/supabaseClient';

/**
 * Passkey/WebAuthn Authentication Helper
 * Integrates directly with Supabase Auth WebAuthn support.
 */
export const passkeyAuth = {
	/**
	 * Check if the app is running with placeholder DB keys
	 */
	isDemoMode: () => {
		return supabase.supabaseUrl && supabase.supabaseUrl.includes('placeholder');
	},

	/**
	 * Enroll a new Passkey for the currently authenticated user.
	 * (Used to attach a passkey to an existing session or during a multi-step signup).
	 * 
	 * @returns {Promise<{ data: any, error: any }>}
	 */
	enrollPasskey: async () => {
		try {
			console.log('[Passkey] Enrolling passkey with Supabase URL:', supabase.supabaseUrl);
			// Initiates the WebAuthn enrollment process in the browser
			const { data, error } = await supabase.auth.mfa.enroll({
				factorType: 'webauthn'
			});
            
			if (error) {
				console.error('[Passkey] MFA enroll error:', error);
				throw error;
			}
            
			// The challenge is automatically handled by the browser's WebAuthn API
			const challenge = await supabase.auth.mfa.challenge({ factorId: data.id });
			if (challenge.error) {
				console.error('[Passkey] MFA challenge error:', challenge.error);
				throw challenge.error;
			}
			
			const verify = await supabase.auth.mfa.verify({
				factorId: data.id,
				challengeId: challenge.data.id,
				code: challenge.data.code // for webauthn, code is handled internally by supabase client
			});
			
			if (verify.error) {
				console.error('[Passkey] MFA verify error:', verify.error);
			}

			return { data: verify.data, error: verify.error };
		} catch (error) {
			console.error('[Passkey] Passkey enrollment failed exception:', error);
			return { data: null, error };
		}
	},

	/**
	 * Sign in using an existing Passkey.
	 * 
	 * @param {string} email - The user's email address
	 * @returns {Promise<{ data: any, error: any }>}
	 */
	signInWithPasskey: async (email) => {
		try {
			console.log('[Auth] Attempting signInWithWebAuthn for:', email, 'Target URL:', supabase.supabaseUrl);
			// Passkey signin requires the email to find the associated factors
			const { data, error } = await supabase.auth.signInWithWebAuthn({
				email
			});

			if (error) {
				console.warn('[Auth] signInWithWebAuthn returned error:', error);
			} else {
				console.log('[Auth] signInWithWebAuthn success:', data);
			}

			return { data, error };
		} catch (error) {
			console.error('[Auth] Passkey sign-in caught exception:', error);
			return { data: null, error };
		}
	},

	/**
	 * One-tap Passkey creation/signup (Passwordless signup).
	 * Creates a new user if they don't exist and immediately enrolls a passkey.
	 * 
	 * @param {string} email 
	 */
	signUpWithPasskey: async (email) => {
		try {
			console.log('[Auth] Attempting signInWithOtp (signup fallback) for:', email, 'Target URL:', supabase.supabaseUrl);
			// First, sign up the user (this will send an OTP/Magic link depending on settings)
			// But since we want passwordless WebAuthn, we need a session first.
			const { data, error: otpError } = await supabase.auth.signInWithOtp({ email });
			
			if (otpError) {
				console.error('[Auth] signInWithOtp returned error:', otpError);
				throw otpError;
			}

			console.log('[Auth] signInWithOtp success response:', data);
			
			return { 
				data: { message: 'OTP sent. Please verify OTP, then call enrollPasskey().', raw: data }, 
				error: null 
			};
		} catch (error) {
			console.error('[Auth] signUpWithPasskey caught exception:', error);
			return { data: null, error };
		}
	}
};
