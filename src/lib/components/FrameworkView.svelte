<script lang="ts">
	import CategoryView from '$lib/components/CategoryView.svelte';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	import type { Framework, FrameworkAuthorCategories, FullFramework } from '$lib/db/schema';
	import { Plus } from 'lucide-svelte';

	export let framework: FullFramework;
</script>

<h2 class="h2">Framework "{framework.title}" created by {framework.author.fullName}</h2>
<!-- <TreeView padding="py-2 px-1" indent="ml-2"> -->
<ul class="ml-2 list-inside list-disc gap-2">
	{#each framework.categories as category}
		{#if category.superCategoryId == 0}
			<li>
				<span class="flex-auto">
					<CategoryView {category} />
				</span>
			</li>
		{/if}
	{/each}
</ul>

<!-- </TreeView> -->

<style lang="postcss">
</style>
