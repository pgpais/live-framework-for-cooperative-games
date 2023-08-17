<script lang="ts">
	import DimensionDetail from '$lib/components/DimensionDetail.svelte';
	import type { Dimension } from '$lib/db/schema';
	import { detailComponent, detailInfoStore } from '$lib/stores/detailView';

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
