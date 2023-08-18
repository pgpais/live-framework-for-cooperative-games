<script lang="ts">
	import CategoryDetailButton from '$lib/components/DetailElements/CategoryDetailButton.svelte';
	import DimensionView from '$lib/components/DimensionView.svelte';
	import type { FullCategory } from '$lib/db/schema';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	export let category: FullCategory;
</script>

<!-- <TreeViewItem open={true} spacing="space-x-4"> -->
<span class="h3 text-secondary-500-400-token"><CategoryDetailButton {category} /></span>
<!-- <svelte:fragment slot="children"> -->
<div class="ml-6 grid gap-3">
	{#if category.dimensions && category.dimensions.length > 0}
		{#each category.dimensions as dimension}
			<DimensionView {dimension} />
		{/each}
	{/if}
</div>
<ul class="list-inside list-disc gap-2">
	{#if category.subCategories && category.subCategories.length > 0}
		{#each category.subCategories as subCategory}
			<li class="ml-2 flex-auto">
				<svelte:self category={subCategory} />
			</li>
		{/each}
	{/if}
</ul>
<!-- </svelte:fragment> -->
<!-- </TreeViewItem> -->
