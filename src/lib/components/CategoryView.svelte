<script lang="ts">
	import CategoryDetailButton from '$lib/components/DetailElements/CategoryDetailButton.svelte';
	import DimensionView from '$lib/components/DimensionView.svelte';
	import type { FullCategory } from '$lib/db/schema';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	export let category: FullCategory;
</script>

<TreeViewItem open={true} spacing="space-x-4">
	<h3 class="h3 text-secondary-500-400-token"><CategoryDetailButton {category} /></h3>
	<svelte:fragment slot="children">
		<div class="ml-6 grid gap-3">
			{#if category.dimensions && category.dimensions.length > 0}
				{#each category.dimensions as dimension}
					<DimensionView {dimension} />
				{/each}
			{/if}
		</div>
		{#if category.subCategories && category.subCategories.length > 0}
			{#each category.subCategories as subCategory}
				<svelte:self category={subCategory} />
			{/each}
		{/if}
	</svelte:fragment>
</TreeViewItem>
