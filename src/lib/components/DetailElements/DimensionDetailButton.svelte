<script lang="ts">
	import type { Dimension } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';
	import { getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";

	const drawerStore = getDrawerStore();

	export let isOfficial: boolean = true;
	export let dimension: Dimension;

	const changeDetailView = (isDrawer: Boolean) => {
		$detailInfoStore = {
			type: 'dimension',
			data: {
				id: dimension.id,
				title: dimension.title,
				description: dimension.description,
				isOfficial: dimension.status == 'official'
			}
		};

		if(isDrawer){
			const settings: DrawerSettings = { id: 'dimension-detail', position:'right' };
			drawerStore.open(settings);
		}
	};
</script>

<button type="button" on:click={() => changeDetailView(false)} class={isOfficial? "hidden xl:block py-1 px-4 variant-filled-primary rounded-full hover:variant-filled-secondary" : "py-1 px-4 variant-filled-warning rounded-full hover:variant-filled-secondary"}>
	<b>{dimension.title}</b>
</button>

<button type="button" on:click={() => changeDetailView(true)} class={isOfficial? "block xl:hidden py-1 px-4 variant-filled-primary rounded-full hover:variant-filled-secondary" : "py-1 px-4 variant-filled-warning rounded-full hover:variant-filled-secondary"}>
	<b>{dimension.title}</b>
</button>
