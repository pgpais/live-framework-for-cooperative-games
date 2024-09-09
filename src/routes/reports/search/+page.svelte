<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';
	import { SearchIcon } from 'lucide-svelte';
	import type { PageData } from './$types';
	import GameDetail from '$lib/components/DetailElements/GameDetail.svelte';
	import type { Game } from '$lib/db/schema';
	import GameCardView from '$lib/components/GameViews/GameCardView.svelte';
	import { type DrawerSettings, getDrawerStore } from '@skeletonlabs/skeleton';

	export let data: PageData;
	$: ({ games } = data);
	let companyFilterSelected = data.companyFilter;
	let genreFilterSelected = data.genreFilter;
	let platformFilterSelected = data.platformFilter;
	let selectedGame: Game | undefined = undefined;

	const drawerStore = getDrawerStore();

	function changeDetailViewDrawer(game: Game): void {
		selectedGame = game;
		const settings: DrawerSettings = {
			id: 'game-detail',
			position: 'right',
			meta: {
				game: game
			}
		};
		drawerStore.open(settings);
	}
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
		<div class="m-5 hidden flex-wrap justify-center gap-10 xl:flex">
			{#each games as game}
				<GameCardView {game} onClick={() => (selectedGame = game)} />
			{/each}
		</div>
		<div class="m-5 flex flex-wrap justify-center gap-10 xl:hidden">
			{#each games as game}
				<GameCardView {game} onClick={() => changeDetailViewDrawer(game)} />
			{/each}
		</div>
	</div>

	<svelte:fragment slot="right">
		<!-- TODO: Abstract into component so you can use in Detail Drawer -->
		{#if selectedGame != undefined}
			<GameDetail game={selectedGame} />
			<!-- reports={fetch('/api/reports?game=' + selectedGame.id).then((res) => res.json())} -->
		{/if}
	</svelte:fragment>
</ThreeColumnLayout>
