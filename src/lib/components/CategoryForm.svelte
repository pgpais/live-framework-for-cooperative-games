<script lang="ts">
	import Separator from '$lib/components/Separator.svelte';
	import DimensionForm from '$lib/components/DimensionForm.svelte';
	import type { CategoryReportSchema } from '$lib/schemas/report';

	export let value: CategoryReportSchema;
</script>

<div class="ml-2">
	<h4 class="h4 mt-3">{value.title}</h4>
	<Separator width={2} />
	<div class="ml-2 grid gap-3">
		{#each value.dimensions as dimension, j}
			<DimensionForm bind:value={value.dimensions[j]} />
		{/each}
	</div>
	{#if value.subCategories && value.subCategories.length > 0}
		{#each value.subCategories as subcategory, i}
			<svelte:self bind:value={value.subCategories[i]} />
		{/each}
	{/if}
</div>
