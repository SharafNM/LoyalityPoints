<script>
	let { data } = $props();
</script>

<div class="max-w-3xl mx-auto p-4 space-y-6">
	<header class="flex justify-between items-center py-4 border-b">
		<h1 class="text-2xl font-bold">My Rewards</h1>
		<div class="text-sm text-gray-500">{data.user.email}</div>
	</header>

	<section class="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col items-center">
		<h2 class="text-lg font-semibold text-blue-900 mb-2">My Member QR Code</h2>
		<!-- In a real app, use a QR code library like svelte-qrcode to render user.id -->
		<div class="w-48 h-48 bg-white border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg">
			<span class="text-gray-400 text-sm">QR Code: {data.user.id.split('-')[0]}...</span>
		</div>
		<p class="text-xs text-center text-gray-500 mt-3">Show this code to merchants to claim points manually.</p>
	</section>

	<section>
		<h2 class="text-xl font-bold mb-4">Points Balance</h2>
		{#if data.balances.length === 0}
			<p class="text-gray-500 italic">You don't have any points yet. Visit a local shop to start earning!</p>
		{:else}
			<div class="grid gap-4 md:grid-cols-2">
				{#each data.balances as balance}
					<div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
						<h3 class="font-semibold text-lg">{balance.shops.name}</h3>
						<div class="mt-2 flex items-baseline gap-2">
							<span class="text-3xl font-bold text-blue-600">{balance.points_balance}</span>
							<span class="text-gray-500 font-medium">pts</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<section>
		<h2 class="text-xl font-bold mb-4">Recent Transactions</h2>
		<div class="bg-white rounded-lg shadow-sm border border-gray-200 divide-y">
			{#if data.transactions.length === 0}
				<p class="p-4 text-gray-500">No recent transactions.</p>
			{:else}
				{#each data.transactions as tx}
					<div class="p-4 flex justify-between items-center">
						<div>
							<p class="font-medium text-gray-900">{tx.shops.name}</p>
							<p class="text-sm text-gray-500">{new Date(tx.created_at).toLocaleDateString()}</p>
						</div>
						<div class="font-bold {tx.type === 'EARNED' ? 'text-green-600' : 'text-red-500'}">
							{tx.type === 'EARNED' ? '+' : '-'}{tx.points_changed}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</section>
</div>
