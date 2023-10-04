<script lang="ts">
	import DimensionForm from '$lib/components/DimensionForm.svelte';
	import type { CategoryReportSchema } from '$lib/schemas/report';
	import CategoryDetailButton from '$lib/components/DetailElements/CategoryDetailButton.svelte';

	export let value: CategoryReportSchema;
	const isOfficial: boolean = value.status == 'official';
	console.log('category', value.title, 'status', value.status);
</script>

<div
	class={isOfficial
		? 'card variant-filled-surface rounded-3xl p-6'
		: 'card variant-filled-surface rounded-3xl border-2 border-warning-500 p-6'}
>
	<span
		class={isOfficial
			? 'text-primary-500-400-token text-2xl'
			: 'text-primary-500-400-token text-2xl'}
		><CategoryDetailButton
			category={{
				description: value.description,
				id: value.id,
				title: value.title,
				isOfficial: isOfficial
			}}
		/></span
	>
	{#if value.dimensions && value.dimensions.length > 0}
		<div class="mb-4 ml-6 mt-2 flex flex-wrap gap-4">
			{#each value.dimensions as dimension, j}
				<DimensionForm bind:value={value.dimensions[j]} bind:dimension={value.dimensions[j]} />
			{/each}
		</div>
	{/if}
</div>

{#if value.subCategories && value.subCategories.length > 0}
	<div
		class="mx-4 my-2 grid gap-4 rounded-none border-l-2 border-l-tertiary-500 pl-4 pt-4 dark:border-l-primary-500"
	>
		{#each value.subCategories as subcategory, i}
			<svelte:self bind:value={value.subCategories[i]} />
		{/each}
	</div>
{/if}
