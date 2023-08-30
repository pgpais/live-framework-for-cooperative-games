<script lang="ts">
	import DimensionForm from '$lib/components/DimensionForm.svelte';
	import type { CategoryReportSchema } from '$lib/schemas/report';
	import CategoryDetailButton from '$lib/components/DetailElements/CategoryDetailButton.svelte';

	export let value: CategoryReportSchema;
</script>

<span class="h3 text-secondary-500-400-token"><CategoryDetailButton category={value} /></span>
<div class="ml-6 grid grid-cols-2 gap-3">
	{#if value.dimensions && value.dimensions.length > 0}
		{#each value.dimensions as dimension, j}
			<DimensionForm bind:value={value.dimensions[j]} bind:dimension={value.dimensions[j]} />
		{/each}
	{/if}
</div>
<ul class="list-inside list-disc gap-2">
	{#if value.subCategories && value.subCategories.length > 0}
		{#each value.subCategories as subcategory, i}
			<li class="ml-2 flex-auto">
				<svelte:self bind:value={value.subCategories[i]} />
			</li>
		{/each}
	{/if}
</ul>
