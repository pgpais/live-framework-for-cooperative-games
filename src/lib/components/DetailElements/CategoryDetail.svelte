<script lang="ts">
	import CategoryDetailButton from '$lib/components/DetailElements/CategoryDetailButton.svelte';
	import DimensionDetailButton from '$lib/components/DetailElements/DimensionDetailButton.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import type { FullCategory, PlainCategory } from '$lib/db/schema';

	export let data: FullCategory;
</script>

<div>
	<h1 class="h1">{data.title}</h1>
	<p>{data.description}</p>
	<Separator verticalMargin={5} width={4} />
	{#if data.subCategories && data.subCategories.length > 0}
		<h2 class="h2">Categories</h2>
		<ul class="list-inside list-disc">
			{#each data.subCategories as category}
				<li><CategoryDetailButton {category} /></li>
			{/each}
		</ul>
	{/if}
	{#if data.subCategories && data.subCategories.length > 0 && data.dimensions && data.dimensions.length > 0}
		<Separator verticalMargin={2} width={2} />
	{/if}
	{#if data.dimensions && data.dimensions.length > 0}
		<h2 class="h2">Dimensions</h2>
		<ul class="list-inside list-disc">
			{#each data.dimensions as dimension}
				<li><DimensionDetailButton {dimension} /></li>
			{/each}
		</ul>
	{/if}
</div>
