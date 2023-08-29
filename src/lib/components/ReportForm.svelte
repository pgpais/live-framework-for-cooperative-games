<script lang="ts">
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import type { CategoryReportSchema } from '$lib/schemas/report';
	
	export let value: { categories: CategoryReportSchema[] };
</script>

<ul class="ml-2 list-inside list-disc gap-2">
	{#each value.categories as category, i}
		<li>
			<CategoryForm bind:value={value.categories[i]} />
		</li>
	{/each}
</ul>
