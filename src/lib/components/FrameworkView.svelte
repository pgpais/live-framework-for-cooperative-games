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
	<h2 class="h2">
		Framework "{framework.title}" created by {framework.author.fullName}
	</h2>
{/if}
<!-- <TreeView padding="py-2 px-1" indent="ml-2"> -->
<div class=" m-4 grid gap-4">
	{#each framework.categories as category}
		{#if !category.superCategoryId || category.superCategoryId == 0}
			<div class="card variant-ghost-surface p-4">
				<CategoryView
					{category}
					{editable}
					{onCategoryRemove}
					{onDimensionRemove}
					{dimensionExamples}
				/>
			</div>
		{/if}
	{/each}
</div>

<!-- </TreeView> -->

<style lang="postcss">
</style>
