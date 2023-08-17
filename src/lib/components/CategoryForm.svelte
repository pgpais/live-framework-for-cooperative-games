<script lang="ts">
	import Separator from '$lib/components/Separator.svelte';
	import DimensionForm from '$lib/components/DimensionForm.svelte';
	import type { CategoryReportSchema } from '$lib/schemas/report';
	import { TreeViewItem, filter } from '@skeletonlabs/skeleton';
	import type { Category, Dimension, FullCategory, dimensions } from '$lib/db/schema';
	import { Info, InfoIcon } from 'lucide-svelte';

	export let value: CategoryReportSchema;
</script>

<TreeViewItem>
	<div class="flex w-full items-center">
		<h4>{value.title}</h4>
		<button type="button" class="btn-icon btn-icon-sm variant-filled ml-5 self-end"><Info /></button
		>
	</div>
	<Separator width={2} />
	<svelte:fragment slot="children">
		<div class="ml-2 grid gap-3">
			{#each value.dimensions as dimension, j}
				<DimensionForm bind:value={value.dimensions[j]} bind:dimension={value.dimensions[j]} />
			{/each}
		</div>
		{#if value.subCategories && value.subCategories.length > 0}
			{#each value.subCategories as subcategory, i}
				<svelte:self bind:value={value.subCategories[i]} />
			{/each}
		{/if}
	</svelte:fragment>
</TreeViewItem>
