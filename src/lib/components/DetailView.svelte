<script lang="ts">
	import DimensionDetail from '$lib/components/DetailElements/DimensionDetail.svelte';
	import { detailInfoStore } from '$lib/stores/detailView';
</script>

{#if $detailInfoStore}
	{#if $detailInfoStore.type === 'dimension'}
		<DimensionDetail data={$detailInfoStore.data} />
	{:else if $detailInfoStore.type === 'category'}
		<p>categoryDetail</p>
	{/if}
{:else}
	<p>no detail info</p>
{/if}
