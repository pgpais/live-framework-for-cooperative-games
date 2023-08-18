<script lang="ts">
	import type { Dimension } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';

	export let dimension: Dimension;

	console.log(dimension);

	const changeDetailView = () => {
		console.log('setting detail view');
		$detailInfoStore = {
			type: 'dimension',
			data: dimension
		};
		console.log($detailInfoStore);
	};
</script>

<button type="button" on:click={changeDetailView}>
	{dimension.title}
</button>
