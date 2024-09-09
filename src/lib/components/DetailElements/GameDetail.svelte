<script lang="ts">
	import type { DimensionExample, Game, Report, User, Dimension } from '$lib/db/schema';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { error } from '@sveltejs/kit';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	console.log('GameDetail.svelte');

	export let game: Game;
	export let isDrawer: boolean = false;

	const drawerStore = getDrawerStore();
	function drawerClose(): void {
		drawerStore.close();
	}

	let reportsFetch: Promise<
		(Report & {
			author: User;
			dimensionExamples: (DimensionExample & { dimension: Dimension })[];
		})[]
	>;

	$: {
		reportsFetch = fetch('/api/reports?game=' + game.id).then((res) => res.json());
	}
</script>

<div class="flex flex-col space-y-4 p-4">
	<div class="flex items-center">
		{#if isDrawer}
			<button on:click={drawerClose} class="p-4">
				<ChevronLeft />
			</button>
		{/if}
	</div>
	<img class="h-32 self-center" src={game.imgUrl} alt={'cover of ' + game.name} />
	<h2 class="h2 text-center text-2xl font-bold">{game.name}</h2>
	<section><p>{game.description}</p></section>
	<section>
		<h3 class="h3">Reports</h3>
		<hr class="pb-2" />
		{#await reportsFetch}
			<div class="grid gap-2">
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
			</div>
		{:then reports}
			{#each reports as report}
				<div class="card variant-ghost-primary p-4">
					<a class="h4" href={'/reports/' + report.id}>Report by {report.author.username}</a>
					<section class="mt-2 flex">
						<div class="flex-grow">
							<h6 class="h6">Values Identified:</h6>
							<div class="line-clamp-4 pl-2">
								{#each report.dimensionExamples as dimensionExample}
									<p>{dimensionExample.dimension.title}</p>
								{/each}
							</div>
						</div>
						<div>
							<a href={'/reports/' + report.id}>
								<ChevronRight />
							</a>
						</div>
					</section>
				</div>
			{/each}
		{/await}
	</section>
</div>
