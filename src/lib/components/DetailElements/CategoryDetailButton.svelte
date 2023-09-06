<script lang="ts">
	import type { Category, FullCategory } from '$lib/db/schema';
	import { detailInfoStore, type DetailInfoCategory } from '$lib/stores/detailView';

	export let category: DetailInfoCategory;

	const changeDetailView = () => {
		console.log('updateing detail store');

		detailInfoStore.set({
			type: 'category',
			data: category
		});

		console.log($detailInfoStore);
	};
</script>

<button type="button" on:click={changeDetailView}>
	{category.title}
</button>
