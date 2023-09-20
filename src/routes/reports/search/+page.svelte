<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';
	import { SearchIcon } from 'lucide-svelte';
	import type { PageData } from './$types';
	import GameDetail from '$lib/components/DetailElements/GameDetail.svelte';
	import type { Game } from '$lib/db/schema';

	export let data: PageData;
	$: ({ games } = data);
	let companyFilterSelected = data.companyFilter;
	let genreFilterSelected = data.genreFilter;
	let platformFilterSelected = data.platformFilter;
	let selectedGame: Game | undefined;
</script>

<!-- TODO: invalidate with filters so load happens again. Change query params -->

<ThreeColumnLayout>
	<div class="flex flex-col">
		<div class="flex gap-5">
			<label>
				<span>Companies</span>
				<select class="select" bind:value={companyFilterSelected}>
					<option value={0}>All</option>
					{#each data.companies as company}
						<option value={company.id}>{company.name}</option>
					{/each}
				</select>
			</label>
			<label>
				<span>Genres</span>
				<select class="select" bind:value={genreFilterSelected}>
					<option value={0}>All</option>
					{#each data.genres as genre}
						<option value={genre.id}>{genre.name}</option>
					{/each}
				</select>
			</label>
			<label>
				<span>Platforms</span>
				<select class="select" bind:value={platformFilterSelected}>
					<option value={0}>All</option>
					{#each data.platforms as platform}
						<option value={platform.id}>{platform.name}</option>
					{/each}
				</select>
			</label>
			<button
				class="btn-primary btn"
				on:click={() => {
					console.log('click');
					console.log(companyFilterSelected, genreFilterSelected, platformFilterSelected);

					let searchParams = new URLSearchParams($page.url.searchParams.toString());

					searchParams.set('company', String(companyFilterSelected));

					searchParams.set('genre', String(genreFilterSelected));

					searchParams.set('platform', String(platformFilterSelected));

					goto(`?${searchParams.toString()}`);
				}}
			>
				<SearchIcon />
			</button>
		</div>
		<p>
			Show list of reports based on a number of filters (e.g. game, author, framework) and sort
			(e.g. oldest, newest) options
		</p>
		<div class="m-5 grid grid-cols-3 gap-5">
			{#each games as game}
				<div class="card variant-filled-secondary card-hover grid content-around">
					<header class="card-header">
						<h2 class="card-title">{game.name}</h2>
					</header>
					<hr class="mx-2 my-2 rounded border-t-2" />
					<section class="flex flex-col gap-2 space-y-4 p-4">
						{#if game.imgUrl}
							<img
								class="h-auto max-w-full rounded-lg"
								src={game.imgUrl}
								alt={'cover of ' + game.name}
							/>
						{:else}
							<div class="variant-outline-warning flex h-64 w-full items-center justify-center">
								<p class="p">No image available</p>
							</div>
						{/if}

						{game.name} has {game.reportsCount ? game.reportsCount : 0} reports
					</section>
					<hr class="mx-2 my-2 rounded border-t-2" />
					<footer class="card-footer flex items-center justify-start space-x-4 p-4">
						<button
							class="variant-filled h-full w-full rounded-xl px-2"
							on:click={() => (selectedGame = game)}>See more</button
						>
					</footer>
				</div>
			{/each}
		</div>
	</div>

	<svelte:fragment slot="right">
		{#if selectedGame}
			<GameDetail game={selectedGame} />
		{/if}
	</svelte:fragment>
</ThreeColumnLayout>
