<script lang="ts">
	import CategoryView from '$lib/components/CategoryView.svelte';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	import type {
		Dimension,
		FirstLevelFramework,
		Framework,
		FrameworkAuthorCategories,
		FullCategory,
		FullFramework
	} from '$lib/db/schema';
	import { Plus } from 'lucide-svelte';
	import Separator from '$lib/components/Separator.svelte';

	export let framework: FullFramework;
	export let editable: boolean = false;
	export let onCategoryRemove: (category: FullCategory) => void = () => {};
	export let onDimensionRemove: (dimension: Dimension) => void = () => {};
</script>

<h2 class="h2">Framework "{framework.title}" created by {framework.author.fullName}</h2>
<!-- <TreeView padding="py-2 px-1" indent="ml-2"> -->
<ul class="ml-2 grid list-inside list-disc">
	{#each framework.categories as category}
		{#if !category.superCategoryId || category.superCategoryId == 0}
			<li>
				<CategoryView {category} {editable} {onCategoryRemove} {onDimensionRemove} />
			</li>
		{/if}
	{/each}
</ul>

<!-- </TreeView> -->

<style lang="postcss">
</style>
