<script lang="ts">
	import CategoryView from '$lib/components/CategoryView.svelte';
	import type { Dimension, DimensionExample, FullCategory, FullFramework } from '$lib/db/schema';

	export let framework: FullFramework;
	export let editable: boolean = false;
	export let showTitle: boolean = true;
	export let onCategoryRemove: (category: FullCategory) => void = () => {};
	export let onDimensionRemove: (dimension: Dimension) => void = () => {};
	export let dimensionExamples: DimensionExample[] | undefined = undefined;
</script>

{#if showTitle}
	<h2 class="h2 mb-6">
		Framework "{framework.title}" created by {framework.author.fullName}
	</h2>
{/if}
<!-- <TreeView padding="py-2 px-1" indent="ml-2"> -->
<div class="grid gap-4">
	{#each framework.categories as category}
		{#if !category.superCategoryId || category.superCategoryId == 0}
			<CategoryView
			{category}
			{editable}
			{onCategoryRemove}
			{onDimensionRemove}
			{dimensionExamples}
			/>
		{/if}
	{/each}
</div>

<!-- </TreeView> -->

<style lang="postcss">
</style>
