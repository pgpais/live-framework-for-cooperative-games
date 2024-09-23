<script lang="ts">
	import type { Dimension } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';
	import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';

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

		if (isDrawer) {
			const settings: DrawerSettings = { id: 'dimension-detail', position: 'right' };
			drawerStore.open(settings);
		}
	};
</script>

<button
	type="button"
	on:click={() => changeDetailView(false)}
	class={isOfficial
		? 'variant-filled-primary hidden h-fit rounded-full px-4 py-1 hover:variant-filled-secondary xl:block'
		: 'variant-filled-warning h-fit rounded-full px-4 py-1 hover:variant-filled-secondary'}
>
	<b>{dimension.title}</b>
</button>

<button
	type="button"
	on:click={() => changeDetailView(true)}
	class={isOfficial
		? 'variant-filled-primary block h-fit rounded-full px-4 py-1 hover:variant-filled-secondary xl:hidden'
		: 'variant-filled-warning h-fit rounded-full px-4 py-1 hover:variant-filled-secondary'}
>
	<b>{dimension.title}</b>
</button>
