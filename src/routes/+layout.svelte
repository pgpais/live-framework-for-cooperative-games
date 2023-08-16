<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, Modal } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/Header.svelte';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import { navigating } from '$app/stores';
</script>

<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>
<Modal />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<Header />
	</svelte:fragment>
	<!-- Page Route Content -->
	{#if $navigating}
		loading
	{:else}
		<slot />
	{/if}
</AppShell>
