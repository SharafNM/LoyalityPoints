<script>
	import { supabase } from '$lib/supabaseClient';
	import { passkeyAuth } from '$lib/auth/passkey';

	// step: 'email' | 'signup_pending' | 'otp'
	let step = $state('email');
	let email = $state('');
	let otp = $state('');
	let loading = $state(false);
	let error = $state('');

	async function handleContinue() {
		loading = true;
		error = '';

		if (passkeyAuth.isDemoMode()) {
			window.location.reload();
			return;
		}

		// Clear any stale session so a previous login's email can't linger
		await supabase.auth.signOut();

		const res = await fetch('/api/auth/initiate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		const result = await res.json();

		if (!res.ok || result.error) {
			error = result.error || 'Something went wrong. Please try again.';
		} else if (result.flow === 'signup') {
			// New user — confirmation link was sent, just wait
			step = 'signup_pending';
		} else {
			// Existing user — 6-digit OTP code was sent
			step = 'otp';
		}

		loading = false;
	}

	async function verifyOtp() {
		loading = true;
		error = '';

		const res = await fetch('/api/auth/verify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, token: otp })
		});

		const result = await res.json();

		if (!res.ok || result.error) {
			error = result.error || 'Something went wrong. Please try again.';
			loading = false;
		} else {
			// Session cookie set server-side — reload so the server redirects based on role
			window.location.href = '/';
		}
	}

	function reset() {
		step = 'email';
		otp = '';
		error = '';
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
	<div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100 text-center">

		<div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
			</svg>
		</div>

		<!-- Step 1: Enter email -->
		{#if step === 'email'}
			<h1 class="text-2xl font-bold mb-2">Welcome</h1>
			<p class="text-gray-500 mb-8">Enter your email to continue.</p>

			<div class="space-y-4 text-left">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						placeholder="you@example.com"
						onkeydown={(e) => e.key === 'Enter' && email && handleContinue()}
						class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
					/>
				</div>

				<button
					onclick={handleContinue}
					disabled={loading || !email}
					class="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
				>
					{#if loading}
						<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Checking...
					{:else}
						Continue
					{/if}
				</button>
			</div>

		<!-- Step 2a: New user — waiting for email confirmation click -->
		{:else if step === 'signup_pending'}
			<div class="text-4xl mb-4">📬</div>
			<h1 class="text-2xl font-bold mb-2">Check your inbox</h1>
			<p class="text-gray-500 mb-2">We sent a confirmation link to</p>
			<p class="font-semibold text-gray-800 mb-6">{email}</p>
			<p class="text-sm text-gray-400 mb-8">Click the link in the email to activate your account and you'll be redirected to your dashboard.</p>

			<button onclick={reset} class="text-sm text-gray-500 hover:text-gray-700 transition">
				← Use a different email
			</button>

		<!-- Step 2b: Existing user — enter 6-digit OTP code -->
		{:else if step === 'otp'}
			<div class="text-4xl mb-4">🔐</div>
			<h1 class="text-2xl font-bold mb-2">Enter your code</h1>
			<p class="text-gray-500 mb-2">We sent a 8-digit code to</p>
			<p class="font-semibold text-gray-800 mb-6">{email}</p>

			<div class="space-y-4 text-left">
				<div>
					<label for="otp" class="block text-sm font-medium text-gray-700 mb-1">8-Digit Code</label>
					<input
						id="otp"
						type="text"
						inputmode="numeric"
						maxlength="8"
						bind:value={otp}
						placeholder="12345678"
						onkeydown={(e) => e.key === 'Enter' && otp.length === 8 && verifyOtp()}
						class="w-full p-3 text-center text-2xl tracking-widest font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
					/>
				</div>

				<button
					onclick={verifyOtp}
					disabled={loading || otp.length !== 8}
					class="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
				>
					{#if loading}
						<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Verifying...
					{:else}
						Sign In
					{/if}
				</button>

				<button onclick={reset} class="w-full text-sm text-gray-500 hover:text-gray-700 transition">
					← Use a different email
				</button>
			</div>
		{/if}

		{#if error}
			<p class="mt-4 text-sm p-3 rounded bg-red-50 text-red-800 border border-red-100">{error}</p>
		{/if}
	</div>
</div>

