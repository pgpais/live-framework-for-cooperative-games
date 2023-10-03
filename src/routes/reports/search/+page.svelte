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
		<div class="m-5 grid grid-cols-4">
			{#each games as game}
				<button class="card variant-filled-tertiary card-hover flex flex-col content-around w-60 justify-between" on:click={() => (selectedGame = game)}>
					<header class="card-header">
						<h2 class="card-title"><b>{game.name}</b></h2>
					</header>

					<section class="flex flex-col gap-2 pl-8 pr-8 place-self-center mt-4 mb-4 justify-between">
						<p>{game.reportsCount ? game.reportsCount : 0} report{game.reportsCount != 1 ? 's' : ''}</p>
						{#if game.imgUrl}
							<img
								class="w-full rounded-lg object-scale-down"
								src={game.imgUrl}
								alt={'cover of ' + game.name}
							/>
						{:else}
							<div class="variant-outline-warning flex h-64 w-full items-center justify-center">
								<p class="p">No image available</p>
							</div>
						{/if}
					</section>
				</button>
			{/each}
		</div>
	</div>

	<svelte:fragment slot="right">
		{#if selectedGame}
			<GameDetail game={selectedGame} />
		{/if}
	</svelte:fragment>
</ThreeColumnLayout>
