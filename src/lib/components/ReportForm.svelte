<script lang="ts">
	import CategoryForm from '$lib/components/CategoryForm.svelte';
	import type { CategoryReportSchema } from '$lib/schemas/report';
	import type { Category } from '$lib/db/schema';
	import { Loader2, Search } from 'lucide-svelte';

	export let value: { categories: CategoryReportSchema[] };

	let isSearching: Boolean | undefined = undefined;

	async function getGame(name: string) {
		isSearching = true;
		const res = await fetch(`/games?name=${name}`);
		const data = await res.json();
		console.log(data);
		gameData = data;
		isSearching = false;
	}

	let gameName: string;

	let gameData: { name: string }[];
</script>

<ul class="ml-2 list-inside list-disc gap-2">
	<div class="flex items-center">
		<input type="text" class="input w-1/4" placeholder="game" bind:value={gameName} />
		<button type="button" class="btn variant-soft-primary ml-2" on:click={() => getGame(gameName)}
			><Search /></button
		>
		{#if isSearching === true}
			<Loader2 class="ml-5 animate-spin" />
		{:else if isSearching === false}
			<select class="select ml-5">
				{#each gameData as game}
					<option value={game.name}>{game.name}</option>
				{/each}
			</select>
		{/if}
	</div>
	{#each value.categories as category, i}
		<li>
			<CategoryForm bind:value={value.categories[i]} />
		</li>
	{/each}
</ul>
