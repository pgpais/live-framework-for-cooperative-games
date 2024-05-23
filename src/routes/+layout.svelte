<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { Modal, Toast, initializeStores, Drawer } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/Header.svelte';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import { navigating } from '$app/stores';
	import type { LayoutData } from './$types';
	import { getDrawerStore } from "@skeletonlabs/skeleton";
	import DimensionDetail from '$lib/components/DetailElements/DimensionDetail.svelte';
	import CategoryDetail from '$lib/components/DetailElements/CategoryDetail.svelte';
	initializeStores();

	const drawerStore = getDrawerStore();

	export let data: LayoutData;
	$: session = data.session;
</script>

<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>
<Modal />
<Toast />
<Drawer position={"right"}>
	{#if $drawerStore.id === 'dimension-detail'}
		<DimensionDetail/>
	{:else if $drawerStore.id === 'category-detail'}
		<CategoryDetail/>
	{:else}
		<!-- (fallback contents) -->
	{/if}
</Drawer>

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
