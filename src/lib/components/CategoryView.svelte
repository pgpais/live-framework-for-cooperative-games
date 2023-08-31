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

	const isOfficial = category.status == 'official';
</script>

<!-- <TreeViewItem open={true} spacing="space-x-4"> -->
<span class={isOfficial ? 'h3 text-secondary-500-400-token' : 'h3 text-warning-500-400-token'}
	><CategoryDetailButton {category} /></span
>
{#if editable}
	<button class="btn-primary btn btn-sm" on:click={() => onCategoryRemove(category)}>
		<Trash2 />
	</button>
{/if}

{#if category.superCategoryId == 0}
	<div class="mb-4 ml-6 mt-2">
		{#if category.description}
			<p class="text-sm">{category.description}</p>
		{/if}
	</div>
{/if}

<!-- <svelte:fragment slot="children"> -->
{#if category.dimensions && category.dimensions.length > 0}
	<div class="mb-4 ml-6 mt-2 flex gap-2">
		{#each category.dimensions as dimension}
			<DimensionView {dimension} {editable} {onDimensionRemove} />
		{/each}
	</div>
{/if}

<ul class="grid list-inside list-disc">
	{#if subCategories && subCategories.length > 0}
		{#each subCategories as subCategory}
			<li class="ml-4 flex-auto">
				<svelte:self category={subCategory} {editable} {onCategoryRemove} {onDimensionRemove} />
			</li>
		{/each}
	{/if}
</ul>

<!-- </svelte:fragment> -->
<!-- </TreeViewItem> -->
