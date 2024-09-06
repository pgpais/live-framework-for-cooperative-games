<script lang="ts">
	import type { Category, FullCategory } from '$lib/db/schema';
	import { detailInfoStore, type DetailInfoData } from '$lib/stores/detailView';
	import { getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";

	const drawerStore = getDrawerStore();
	export let category: DetailInfoData;

	const changeDetailView = (isDrawer: Boolean) => {
		console.log('updateing detail store');

		detailInfoStore.set({
			type: 'category',
			data: category
		});

		console.log($detailInfoStore);

		if(isDrawer){
			const settings: DrawerSettings = { id: 'category-detail', position:'right' };
			drawerStore.open(settings);
		}
	};
</script>

<button type="button" on:click={() => changeDetailView(false)} class="hidden xl:block text-start rounded-xl p-1 hover:bg-primary-500/20">
	<b>{category.title}</b>
</button>

<button type="button" on:click={() => changeDetailView(true)} class="block xl:hidden text-start rounded-xl p-1 hover:bg-primary-500/20">
	<b>{category.title}</b>
</button>
