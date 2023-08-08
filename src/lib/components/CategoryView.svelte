<script lang="ts">
	import type {
		Category,
		CategoryWithMaybeEverything,
		CategoryWithSubCategories
	} from '../../db/schema';

	export let category: CategoryWithSubCategories;
	export let indent: number = 1;
	console.log(category);
</script>

<div class="text-left">
	<p class="pl-{indent}">
		{category.title}
	</p>
	<div class="pl-{indent * 10}">
		{#if category.subCategories && category.subCategories.length > 0}
			{#each category.subCategories as subCategory}
				<svelte:self category={subCategory} indent={indent + 1} />
			{/each}
		{/if}
	</div>
</div>
