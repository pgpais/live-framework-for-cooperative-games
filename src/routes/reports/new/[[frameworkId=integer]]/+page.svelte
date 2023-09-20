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
	import { Step, Stepper, getToastStore } from '@skeletonlabs/skeleton';
	import { categories, key } from '$lib/db/schema';

	export let data: PageData;
	const framework = data.framework;

	const toastStore = getToastStore();

	const { form, message, enhance, delayed } = superForm(data.form, {
		dataType: 'json',
		onResult({ result }) {
			console.log(result);
			toastStore.trigger({ message: 'Report submitted successfully' });
		}
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

	let gamesData: (NewGame & {
		genres: { id: number; name: string }[];
		platforms: { id: number; name: string }[];
		companies: { id: number; name: string }[];
	})[];
	let selectedGame:
		| (NewGame & {
				genres: { id: number; name: string }[];
				platforms: { id: number; name: string }[];
				companies: { id: number; name: string }[];
		  })
		| undefined = undefined;
	let selectedGameId: number;

	const isDimensionReported = () => {
		for (let category of $form.categories) {
			if (category.dimensions === undefined) {
				continue;
			}
			for (let dimension of category.dimensions) {
				if (dimension.included) {
					return true;
				}
			}
		}
		return false;
	};
</script>

<ThreeColumnLayout>
	<div slot="left">
		<SuperDebug data={$form} />
	</div>
	<div class="m-5">
		<h2 class="h2 mb-5">
			Report for <i>{$form.game.name ? $form.game.name : 'an unselected game'}</i> based on
			Framework
			<i>{framework.title}</i>
		</h2>
		<form method="POST" use:enhance>
			<button type="submit" disabled style="display: none" aria-hidden="true" />
			<Stepper class="card variant-ghost-surface p-5" buttonCompleteType="submit">
				<Step locked={selectedGame == undefined}>
					<svelte:fragment slot="header">What game are you reporting on?</svelte:fragment>
					<div class="my-5 flex items-center">
						<div class="flex w-full flex-col gap-3">
							<div>
								<input
									type="text"
									class="input w-1/4"
									placeholder="Search for a Game"
									bind:value={gameNameQuery}
									on:submit={() => getGame(gameNameQuery)}
									on:keydown={(e) => {
										if (e.key === 'Enter') {
											getGame(gameNameQuery);
										}
									}}
								/>
								<button
									type="button"
									class="variant-soft-primary btn ml-2"
									on:click={() => getGame(gameNameQuery)}
								>
									<Search />
								</button>
							</div>
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
											selectedGame = game;
											$form.game = selectedGame;
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
							{#if selectedGame}
								<div class="card variant-ghost-tertiary flex p-5">
									<div class="card-header flex w-1/3 flex-col gap-2">
										<h3 class="h3">{selectedGame.name}</h3>
										{#if selectedGame.imgUrl}
											<img
												src={selectedGame.imgUrl}
												alt={selectedGame.name}
												class="h-64 w-full object-contain"
											/>
										{:else}
											<div
												class="variant-outline-warning flex h-64 w-full items-center justify-center"
											>
												<p class="p">No image available</p>
											</div>
										{/if}
									</div>
									<div class="flex w-2/3 flex-col gap-4">
										{#if selectedGame.releaseDate}
											<p class="p">
												<b>Release Date: </b>{Intl.DateTimeFormat('en-US', {
													year: 'numeric',
													month: 'long',
													day: 'numeric'
												}).format(new Date(0).setUTCSeconds(+selectedGame.releaseDate))}
											</p>
										{/if}
										{#if selectedGame.genres}
											<p class="p">
												<b>Genres: </b>
												{#each selectedGame.genres as genre}
													<span>{genre.name}&nbsp;</span>
												{/each}
											</p>
										{/if}
										{#if selectedGame.description}
											<p class="p"><b>Description: </b>{selectedGame.description}</p>
										{/if}
									</div>
								</div>
							{/if}
						</div>
					</div>
				</Step>
				<Step locked={$delayed}>
					<!-- <svelte:fragment slot="header">(header)</svelte:fragment> -->
					<!-- <TreeView> -->
					{#if $message}
						<p class="text-error-900">{$message}</p>
					{/if}
					{#if $delayed}
						<Loader2 class="mx-5 animate-spin" />
					{/if}
					<ReportForm bind:value={$form} />
					<!-- </TreeView> -->
					<!-- <button class="btn variant-soft-primary my-2">Submit</button> -->
				</Step>
			</Stepper>
		</form>
	</div>
	<div class="m-6" slot="right">
		<DetailView />
	</div>
</ThreeColumnLayout>
