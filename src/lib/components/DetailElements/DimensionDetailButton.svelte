<script lang="ts">
	import type { Dimension } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';

	export let dimension: Dimension;

	const changeDetailView = () => {
		$detailInfoStore = {
			type: 'dimension',
			data: dimension
		};
	};
</script>

<button type="button" on:click={changeDetailView}>
	{dimension.title}
</button>
