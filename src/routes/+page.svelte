<script>
	import { passkeyAuth } from '$lib/auth/passkey';

	let email = $state('');
	let loading = $state(false);
	let message = $state('');

	async function handleAuth() {
		loading = true;
		message = '';
		
		// If using placeholder DB, simulate successful auth for demo
		if (passkeyAuth.isDemoMode()) {
			window.location.reload();
			return;
		}

		// Attempt to sign in first (if passkey exists)
		const { data: signInData, error } = await passkeyAuth.signInWithPasskey(email);
		
		if (error) {
			// If sign-in fails, try the signup flow
			const { data: signUpData, error: signUpError } = await passkeyAuth.signUpWithPasskey(email);
			if (signUpError) {
				message = `Authentication failed: ${signUpError.message || 'Failed to fetch or network error.'}`;
			} else {
				message = 'Verification sent! Check your email to verify and complete Passkey enrollment.';
			}
		} else {
			window.location.reload();
		}
		
		loading = false;
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-center">
	<div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
		<div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
			</svg>
		</div>
		
		<h1 class="text-2xl font-bold mb-2">Welcome</h1>
		<p class="text-gray-500 mb-8">Sign in or register seamlessly without a password.</p>
		
		<div class="space-y-5 text-left">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
				<input 
					id="email"
					type="email" 
					bind:value={email} 
					placeholder="you@example.com" 
					class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
				/>
			</div>
			
			<button 
				onclick={handleAuth} 
				disabled={loading || !email}
				class="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
			>
				{#if loading}
					<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					Processing...
				{:else}
					Sign In / Register
				{/if}
			</button>
			
			{#if message}
				<p class="text-sm text-center p-3 rounded bg-blue-50 text-blue-800 border border-blue-100">{message}</p>
			{/if}
		</div>
	</div>
</div>

