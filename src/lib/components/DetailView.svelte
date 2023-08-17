<script lang="ts">
	import DimensionDetail from '$lib/components/DimensionDetail.svelte';
	import { detailComponent, detailInfoStore } from '$lib/stores/detailView';
</script>

{#if $detailInfoStore}
	{#if $detailInfoStore.type === 'dimension'}
		<DimensionDetail data={$detailInfoStore.data} />
	{:else if $detailInfoStore.type === 'category'}
		<p>categoryDetail</p>
	{/if}
{/if}
