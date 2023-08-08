<script lang="ts">
	import type { Category, CategoryWithMaybeEverything } from '../../db/schema';

	export let category: CategoryWithMaybeEverything;
	export let indent: number = 0;
</script>

<div class="text-left">
	<p class={`ml-${indent}`}>
		{category.title}
	</p>
	{#if category.subCategories}
		{#each category.subCategories as subCategory}
			<svelte:self {subCategory} indent={indent + 1} />
		{/each}
	{/if}
</div>
