<script>
	import '../app.css';
	import { onMount } from 'svelte';
	// PWA Registration provided by vite-plugin-pwa
	import { pwaInfo } from 'virtual:pwa-info';

	let { children } = $props();

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
					console.log('SW Registered:', r);
				},
				onRegisterError(error) {
					console.log('SW registration error', error);
				}
			});
		}
	});
</script>

<svelte:head>
	{#if pwaInfo}
		{@html pwaInfo.webManifest.linkTag}
	{/if}
</svelte:head>

<main class="min-h-screen bg-gray-50 text-gray-900 font-sans">
	{@render children()}
</main>
