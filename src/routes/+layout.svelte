<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { Modal, Toast, initializeStores, Drawer, AppRail } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/Header.svelte';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import { navigating } from '$app/stores';
	import type { LayoutData } from './$types';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import DimensionDetail from '$lib/components/DetailElements/DimensionDetail.svelte';
	import CategoryDetail from '$lib/components/DetailElements/CategoryDetail.svelte';
	import SidebarNavigation from '$lib/components/SidebarNavigation.svelte';
	import GameDetail from '$lib/components/DetailElements/GameDetail.svelte';
	import { reports } from '$lib/db/schema';
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
<Drawer>
	{#if $drawerStore.id === 'dimension-detail'}
		<DimensionDetail isDrawer={true} />
	{:else if $drawerStore.id === 'category-detail'}
		<CategoryDetail isDrawer={true} />
	{:else if $drawerStore.id == 'nav-menu'}
		<SidebarNavigation />
	{:else if $drawerStore.id == 'game-detail'}
		<GameDetail game={$drawerStore.meta.game} isDrawer={true} />
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
