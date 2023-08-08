<script lang="ts">
	import CategoryView from '$lib/components/CategoryView.svelte';
	import type { Framework, FrameworkAuthorCategories } from '../../db/schema';

	export let framework: FrameworkAuthorCategories;
</script>

<div class="text-left">
	{#each framework.categories as category}
		{#if category.superCategoryId === null}
			<CategoryView {category} />
		{/if}
	{/each}
</div>

<style lang="postcss">
</style>
