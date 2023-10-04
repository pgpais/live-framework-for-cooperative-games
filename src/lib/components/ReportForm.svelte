<script lang="ts">
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import type { CategoryReportSchema } from '$lib/schemas/report';

	export let value: { categories: CategoryReportSchema[] };
	//print isOfficial for every category
</script>

<div class="grid gap-4">
	{#each value.categories as category, i}
		{#if !category.superCategoryId || category.superCategoryId == 0}
			<CategoryForm bind:value={value.categories[i]} />
		{/if}
	{/each}
</div>
