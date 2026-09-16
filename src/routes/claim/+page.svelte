<script>
	import { enhance } from '$app/forms';
	import { passkeyAuth } from '$lib/auth/passkey';

	let { data } = $props();

	let email = $state('');
	let loading = $state(false);
	let message = $state('');

	async function handlePasskeyLogin() {
		loading = true;
		const { error } = await passkeyAuth.signInWithPasskey(email);
		if (error) {
			message = 'Sign-in failed. If new, try signing up.';
		} else {
			// Successful login will update the session, triggering a reload if configured,
			// or we can reload manually to reflect authenticated state.
			window.location.reload();
		}
		loading = false;
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
	<div class="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
		<h1 class="text-2xl font-bold text-center mb-4">Claim Your Points</h1>
		
		{#if data.authenticated}
			{#if data.missingParams}
				<p class="text-center text-gray-600 mb-6">You are authenticated, but no valid point claim token was provided. Visit a shop to scan a valid QR code!</p>
				<a href="/dashboard" class="block text-center w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
					Go to Dashboard
				</a>
			{:else}
				<p class="text-center text-gray-600 mb-6">You are authenticated! Click below to claim your points.</p>
				
				<form method="POST" action="?/claim" use:enhance>
					<input type="hidden" name="shopId" value={data.shopId} />
					<input type="hidden" name="token" value={data.token} />
					<button type="submit" class="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
						Claim Points Now
					</button>
				</form>
			{/if}
		{:else}
			<p class="text-center text-gray-600 mb-6">
				{#if data.missingParams}
					Sign in with a Passkey (No password needed) to view your dashboard!
				{:else}
					Sign in with a Passkey (No password needed) to claim your points!
				{/if}
			</p>
			
			<div class="space-y-4">
				<input 
					type="email" 
					bind:value={email} 
					placeholder="Enter your email" 
					class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
				/>
				<button 
					onclick={handlePasskeyLogin} 
					disabled={loading || !email}
					class="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
				>
					{loading ? 'Authenticating...' : 'Sign in with Passkey'}
				</button>
				
				{#if message}
					<p class="text-red-500 text-sm text-center mt-2">{message}</p>
				{/if}
			</div>
		{/if}
	</div>
</div>
