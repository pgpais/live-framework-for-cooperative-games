<script lang="ts">
	import type { Dimension } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';

	export let dimension: Dimension;

	console.log(dimension);

	const changeDetailView = () => {
		detailInfoStore.set({
			type: 'dimension',
			data: dimension
		});
	};
</script>

<button on:click={changeDetailView} class="text-primary-500-400-token">
	{dimension.title}
</button>
