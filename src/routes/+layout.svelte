<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { Modal, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/Header.svelte';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import { navigating } from '$app/stores';
	import type { LayoutData } from './$types';

	initializeStores();

	export let data: LayoutData;
	$: session = data.session;
</script>

<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>
<Modal />
<Toast />
<!-- App Shell -->
<div class="flex h-screen w-screen flex-col">
	<!-- App Bar -->
	<div class="h-[12%] min-h-[100px]">
		<Header {session} />
	</div>
	<!-- Page Route Content -->
	<div class="flex h-[88%] flex-grow overflow-hidden">
		<slot />
	</div>
</div>
