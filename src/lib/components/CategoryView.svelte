<script lang="ts">
	import DimensionView from '$lib/components/DimensionView.svelte';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	import type {
		Category,
		CategoryWithMaybeEverything,
		CategoryWithSubCategories,
		FullCategory
	} from '../../db/schema';

	export let category: FullCategory;
</script>

<TreeViewItem open={true}>
	<h1>
		{category.title}
	</h1>
	<svelte:fragment slot="children">
		{#if category.dimensions && category.dimensions.length > 0}
			<h2 class="variant-soft-secondary">Dimensions</h2>
			{#each category.dimensions as dimension}
				<DimensionView {dimension} />
			{/each}
		{/if}
		{#if category.subCategories && category.subCategories.length > 0}
			<TreeViewItem open={true}>
				<h2 class="text-tertiary-500/25 text-xs">Subcategories</h2>
				<svelte:fragment slot="children">
					{#each category.subCategories as subCategory}
						<svelte:self category={subCategory} />
					{/each}
				</svelte:fragment>
			</TreeViewItem>
		{/if}
	</svelte:fragment>
</TreeViewItem>
