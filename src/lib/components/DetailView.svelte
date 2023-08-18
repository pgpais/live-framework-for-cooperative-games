<script lang="ts">
	import CategoryDetail from '$lib/components/DetailElements/CategoryDetail.svelte';
	import DimensionDetail from '$lib/components/DetailElements/DimensionDetail.svelte';
	import { detailInfoStore } from '$lib/stores/detailView';
</script>

{#if $detailInfoStore}
	{#if $detailInfoStore.type === 'dimension'}
		<DimensionDetail data={$detailInfoStore.data} />
	{:else if $detailInfoStore.type === 'category'}
		<CategoryDetail data={$detailInfoStore.data} />
	{/if}
{:else}
	<p>no detail info</p>
{/if}
