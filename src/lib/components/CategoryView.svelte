<script lang="ts">
	import CategoryDetailButton from '$lib/components/DetailElements/CategoryDetailButton.svelte';
	import DimensionView from '$lib/components/DimensionView.svelte';
	import type { Dimension, FullCategory } from '$lib/db/schema';
	import { Trash2 } from 'lucide-svelte';
	export let category: FullCategory;
	if (category.subCategories && category.subCategories.length > 0) {
		console.log(category);
	}

	export let editable: boolean = false;
	export let onCategoryRemove: (category: FullCategory) => void = () => {};
	export let onDimensionRemove: (dimension: Dimension) => void = () => {};

	$: subCategories = category.subCategories;
</script>

<!-- <TreeViewItem open={true} spacing="space-x-4"> -->
<span class="h3 text-secondary-500-400-token"><CategoryDetailButton {category} /></span>
{#if editable}
	<button class="btn-primary btn btn-sm" on:click={() => onCategoryRemove(category)}>
		<Trash2 />
	</button>
{/if}
<!-- <svelte:fragment slot="children"> -->
{#if category.dimensions && category.dimensions.length > 0}
	<div class="mb-4 ml-6 mt-2 grid gap-2">
		{#each category.dimensions as dimension}
			<DimensionView {dimension} {editable} {onDimensionRemove} />
		{/each}
	</div>
{/if}

<ul class="grid list-inside list-disc">
	{#if subCategories && subCategories.length > 0}
		{#each subCategories as subCategory}
			<li class="ml-2 flex-auto">
				<svelte:self category={subCategory} {editable} {onCategoryRemove} {onDimensionRemove} />
			</li>
		{/each}
	{/if}
</ul>

<!-- </svelte:fragment> -->
<!-- </TreeViewItem> -->
