<script lang="ts">
	import type { Category } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';

	export let category: Category;

	const changeDetailView = () => {
		console.log('setting detail view');
		$detailInfoStore = {
			type: 'category',
			data: category
		};
		console.log(detailInfoStore);
	};
</script>

<button type="button" on:click={changeDetailView}>
	{category.title}
</button>
