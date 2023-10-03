<script lang="ts">
	import CategoryDetailButton from '$lib/components/DetailElements/CategoryDetailButton.svelte';
	import DimensionView from '$lib/components/DimensionView.svelte';
	import type { Dimension, DimensionExample, FullCategory } from '$lib/db/schema';
	import { Trash2 } from 'lucide-svelte';
	export let category: FullCategory;
	if (category.subCategories && category.subCategories.length > 0) {
		console.log(category);
	}

	export let editable: boolean = false;
	export let onCategoryRemove: (category: FullCategory) => void = () => {};
	export let onDimensionRemove: (dimension: Dimension) => void = () => {};
	export let dimensionExamples: DimensionExample[] | undefined = undefined;

	$: subCategories = category.subCategories;

	const isOfficial = category.status == 'official';

	function getDimensionExample(dimensionId: number) {
		const example = dimensionExamples?.find((de) => de.dimensionId == dimensionId);
		console.log('dimensionId', dimensionId, 'examples', dimensionExamples, 'example', example);
		return example;
	}
</script>

<!-- <TreeViewItem open={true} spacing="space-x-4"> -->
<div>

	<div class={ isOfficial ?"card variant-filled-tertiary p-6 rounded-3xl": "card variant-filled-tertiary p-6 rounded-3xl border-warning-500 border-2"}>
		<span class={isOfficial ? 'text-primary-500-400-token text-2xl' : 'text-primary-500-400-token text-2xl'}>
			<CategoryDetailButton
			category={{
				title: category.title,
				id: category.id,
				description: category.description,
				isOfficial: category.status == 'official'
				}}
			/>
		</span>

		{#if editable}
			<button class="btn-primary btn btn-sm" on:click={() => onCategoryRemove(category)}>
				<Trash2 />
			</button>
		{/if}

		{#if category.superCategoryId == 0}
			<div class="mb-4 ml-6 mt-2">
				{#if category.description}
					<p>{category.description}</p>
				{/if}
			</div>
		{/if}

<!-- <svelte:fragment slot="children"> -->
	{#if category.dimensions && category.dimensions.length > 0}
		<div class="mb-4 ml-6 mt-2 flex gap-4 flex-wrap">
			{#each category.dimensions as dimension}
				{#if (dimensionExamples && getDimensionExample(dimension.id)) || !dimensionExamples}
					<DimensionView
						{dimension}
						{editable}
						{onDimensionRemove}
						dimensionExample={getDimensionExample(dimension.id)}
					/>
				{/if}
			{/each}
		</div>
	{/if}
</div>
	{#if subCategories && subCategories.length > 0}
	<div class="mx-4 grid gap-4 rounded-none border-l-2 pl-4 pt-4 my-2 dark:border-l-primary-500 border-l-tertiary-500">
		{#each subCategories as subCategory}
				<svelte:self
					category={subCategory}
					{editable}
					{onCategoryRemove}
					{onDimensionRemove}
					{dimensionExamples}
				/>
				{/each}
	</div>
	{/if}
</div>
<!-- </svelte:fragment> -->
<!-- </TreeViewItem> -->
