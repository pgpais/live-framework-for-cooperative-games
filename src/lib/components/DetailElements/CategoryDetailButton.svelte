<script lang="ts">
	import type { Category, FullCategory } from '$lib/db/schema';
	import { detailInfoStore, type DetailInfoData } from '$lib/stores/detailView';

	export let category: DetailInfoData;

	const changeDetailView = () => {
		console.log('updateing detail store');

		detailInfoStore.set({
			type: 'category',
			data: category
		});

		console.log($detailInfoStore);
	};
</script>

<button type="button" on:click={changeDetailView} class="rounded-xl p-1 hover:bg-primary-500/20">
	<b>{category.title}</b>
</button>
