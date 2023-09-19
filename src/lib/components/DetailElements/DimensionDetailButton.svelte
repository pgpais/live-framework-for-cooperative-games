<script lang="ts">
	import type { Dimension } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';

	export let dimension: Dimension;

	const changeDetailView = () => {
		$detailInfoStore = {
			type: 'dimension',
			data: {
				id: dimension.id,
				title: dimension.title,
				description: dimension.description,
				isOfficial: dimension.status == 'official'
			}
		};
	};
</script>

<button type="button" on:click={changeDetailView} class="p-2 hover:bg-primary-500/20">
	<b>{dimension.title}</b>
</button>
