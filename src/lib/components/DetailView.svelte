<script lang="ts">
	import CategoryDetail from '$lib/components/DetailElements/CategoryDetail.svelte';
	import DimensionDetail from '$lib/components/DetailElements/DimensionDetail.svelte';
	import { detailInfoStore } from '$lib/stores/detailView';

	console.log('sasdasd', $detailInfoStore);
</script>

{#if $detailInfoStore}
	{#if $detailInfoStore.type === 'dimension'}
		<DimensionDetail />
	{:else if $detailInfoStore.type === 'category'}
		<CategoryDetail />
	{/if}
	<!-- {:else} -->
	<!-- <p>Click on a category or value to get more information</p> -->
{:else}
	<div class="p-8">Select an item to get more more information in this section</div>
{/if}
