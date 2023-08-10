<script lang="ts">
	import DimensionView from '$lib/components/DimensionView.svelte';
	import type { FullCategory } from '$lib/db/schema';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	export let category: FullCategory;
</script>

<TreeViewItem open={true}>
	<h3>
		{category.title}
	</h3>
	<svelte:fragment slot="children">
		{#if category.dimensions && category.dimensions.length > 0}
			<h4 class="variant-soft-secondary">Dimensions</h4>
			{#each category.dimensions as dimension}
				<DimensionView {dimension} />
			{/each}
		{/if}
		{#if category.subCategories && category.subCategories.length > 0}
			<TreeViewItem open={true}>
				<h4 class="text-xs text-tertiary-500/25">Subcategories</h4>
				<svelte:fragment slot="children">
					{#each category.subCategories as subCategory}
						<svelte:self category={subCategory} />
					{/each}
				</svelte:fragment>
			</TreeViewItem>
		{/if}
	</svelte:fragment>
</TreeViewItem>
