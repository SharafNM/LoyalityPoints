<script>
	let { data } = $props();
</script>

<div class="max-w-4xl mx-auto p-4 space-y-6">
	<header class="flex justify-between items-center py-4 border-b">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Merchant Dashboard</h1>
			<p class="text-gray-500">Welcome back, {data.shop?.name || 'Shop Owner'}</p>
		</div>
		<div class="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Admin</div>
	</header>

	<section class="grid gap-4 md:grid-cols-2">
		<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center">
			<div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
			</div>
			<h2 class="text-lg font-bold">Award Points</h2>
			<p class="text-gray-500 text-sm mb-4">Scan a customer's QR code to manually add points.</p>
			<button class="px-5 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
				Open Scanner
			</button>
		</div>
		
		<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center">
			<div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
				</svg>
			</div>
			<h2 class="text-lg font-bold">Generate Claim Link</h2>
			<p class="text-gray-500 text-sm mb-4">Create a generic QR code for customers to scan and claim points.</p>
			<button class="px-5 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition">
				Create Link
			</button>
		</div>
	</section>

	<section class="mt-8">
		<h2 class="text-xl font-bold mb-4">Recent Activity</h2>
		<div class="bg-white rounded-lg shadow-sm border border-gray-200 divide-y">
			{#if data.recentClaims.length === 0}
				<p class="p-6 text-gray-500 text-center">No recent point transactions.</p>
			{:else}
				{#each data.recentClaims as tx}
					<div class="p-4 flex justify-between items-center hover:bg-gray-50">
						<div>
							<p class="font-medium text-gray-900">{tx.profiles?.full_name || 'Anonymous Customer'}</p>
							<p class="text-sm text-gray-500">{new Date(tx.created_at).toLocaleString()}</p>
						</div>
						<div class="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
							+{tx.points_changed} pts
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</section>
</div>
