<script lang="ts">
	import type { Category } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';

	export let category: Category;

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
