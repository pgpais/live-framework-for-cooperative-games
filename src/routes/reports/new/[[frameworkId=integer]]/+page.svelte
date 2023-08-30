<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import Separator from '$lib/components/Separator.svelte';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';

	import DetailView from '$lib/components/DetailView.svelte';
	import ReportForm from '$lib/components/ReportForm.svelte';
	import { Loader2, Search } from 'lucide-svelte';
	import type { NewGame } from '$lib/db/schema/game';

	export let data: PageData;
	const framework = data.framework;

	const { form, enhance } = superForm(data.form, {
		dataType: 'json'
	});

	let isSearching: Boolean | undefined = undefined;

	async function getGame(name: string) {
		isSearching = true;
		const res = await fetch(`/api/games?name=${name}`);
		const data = await res.json();
		console.log(data);
		gamesData = data;
		isSearching = false;
	}

	let gameNameQuery: string;

	let gamesData: NewGame[];
	let selectedGameId: number;
</script>

<ThreeColumnLayout>
	<div slot="left">
		<SuperDebug data={$form} />
	</div>
	<div class="m-5">
		<h2 class="h2">
			Report for <i>{$form.game.name ? $form.game.name : 'an unselected game'}</i> based on
			Framework
			<i>{framework.title}</i>
		</h2>
		<Separator />

		<div class="my-5 flex items-center">
			<form>
				<input
					type="text"
					class="input w-1/4"
					placeholder="Search for a Game"
					bind:value={gameNameQuery}
				/>
				<button
					type="button"
					class="btn variant-soft-primary ml-2"
					on:click={() => getGame(gameNameQuery)}
				>
					<Search />
				</button>
			</form>
		</div>
		<form method="POST" use:enhance>
			{#if isSearching === true}
				<Loader2 class="mx-5 animate-spin" />
			{:else if isSearching === false}
				<select
					class="select mx-5"
					placeholder="Select your game"
					bind:value={selectedGameId}
					on:change={() => {
						let game = gamesData.find((game) => game.id === selectedGameId);
						if (game) {
							$form.game = game;
							console.log($form.game);
						}
					}}
				>
					<option value="-1">Select your Game</option>
					{#each gamesData as gameData}
						<option value={gameData.id}>
							{gameData.name}
						</option>
					{/each}
				</select>
			{/if}
			<!-- <TreeView> -->
			<ReportForm bind:value={$form} />
			<!-- </TreeView> -->
			<button class="btn variant-soft-primary my-2">Submit</button>
		</form>
	</div>
	<div class="m-6" slot="right">
		<DetailView />
	</div>
</ThreeColumnLayout>
