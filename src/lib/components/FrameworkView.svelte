<script lang="ts">
	import CategoryView from '$lib/components/CategoryView.svelte';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	import type { Framework, FrameworkAuthorCategories, FullFramework } from '../../db/schema';

	export let framework: FullFramework;
</script>

<div class="text-left">
	<TreeView>
		{#each framework.categories as category}
			{#if category.superCategoryId === null}
				<CategoryView {category} />
			{/if}
		{/each}
	</TreeView>
</div>

<style lang="postcss">
</style>
