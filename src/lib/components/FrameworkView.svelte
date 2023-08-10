<script lang="ts">
	import CategoryView from '$lib/components/CategoryView.svelte';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	import type { Framework, FrameworkAuthorCategories, FullFramework } from '$lib/db/schema';
	import { Plus } from 'lucide-svelte';

	export let framework: FullFramework;
</script>

<h2 class="h2">Framework created by {framework.author.fullName}</h2>
<TreeView>
	{#each framework.categories as category}
		{#if category.superCategoryId === null}
			<CategoryView {category} />
		{/if}
	{/each}
</TreeView>

<style lang="postcss">
</style>
