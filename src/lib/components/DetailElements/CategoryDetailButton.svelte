<script lang="ts">
	import type { Category, FullCategory } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';

	export let category: FullCategory;

	const changeDetailView = () => {
		$detailInfoStore = {
			type: 'category',
			data: category
		};
	};
</script>

<button type="button" on:click={changeDetailView}>
	{category.title}
</button>
