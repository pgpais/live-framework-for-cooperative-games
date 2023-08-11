<script lang="ts">
	import Separator from '$lib/components/Separator.svelte';
	import type { CategoryWithDimensions, Dimension } from '$lib/db/schema';
	import DimensionForm from '$lib/components/DimensionForm.svelte';
	import type { CategoryReportSchema, categoryReportSchema } from '$lib/schemas/report';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import { subCategories } from '$lib/db/schema/subcategory';

	export let value: CategoryReportSchema;
</script>

<div class="ml-2">
	<h4 class="h4 mt-3">{value.title}</h4>
	<Separator width={2} />
	<div class="ml-2 grid gap-3">
		{#each value.dimensions as dimension, j}
			<DimensionForm dimensionName={value.dimensions[j].title} bind:value={value.dimensions[j]} />
		{/each}
	</div>
	{#if value.subCategories && value.subCategories.length > 0}
		{#each value.subCategories as subcategory, i}
			<svelte:self value={value.subCategories[i]} />
		{/each}
	{/if}
</div>
