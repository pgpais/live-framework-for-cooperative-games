<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { DimensionExample, Game, Report, User, Dimension } from '$lib/db/schema';
	import type { Session } from 'lucia';
	import { Eye, Trash, Trash2, EyeOff } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let report: Report;
	export let game: Game;
	export let user: User | undefined = undefined;
	export let authenticatedAsUser: boolean = false;

	let examplesFetch: () => Promise<(DimensionExample & { dimension: Dimension })[]> = async () => {
		const res = fetch('/api/examples/byReport/' + report.id).then((res) => res.json());
		return res;
	};

	async function swapReportPublic() {
		const newReport = report;
		newReport.public = !newReport.public;

		const response = await fetch(`/api/reports/${report.id}`, {
			method: 'PUT',
			body: JSON.stringify(newReport),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response) {
			report = newReport;
		}
	}

	async function deleteReport() {
		const response = await fetch(`/api/reports/${report.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response) {
			invalidateAll();
		}
	}

	let date: Date = new Date(report.createdAt);
</script>

<div class="card variant-ringed-surface card-hover">
	<header class="h3 card-header flex h-56 flex-col items-center gap-2">
		<div class="flex w-full">
			<div class="grow">
				<a href={'/reports/' + report.id} class="h3">{game.name}</a>
			</div>
			{#if authenticatedAsUser}
				<div class="flex shrink">
					<button class="btn-icon btn-icon-base" on:click={deleteReport}>
						<Trash2 class="place-self-center" />
					</button>
					{#if report.public}
						<button on:click={swapReportPublic} class="btn-icon btn-icon-base">
							<Eye />
						</button>
					{:else}
						<button on:click={swapReportPublic} class="btn-icon btn-icon-base">
							<EyeOff />
						</button>
					{/if}
				</div>
			{/if}
		</div>

		<div class="flex w-2/3 justify-between">
			{#if user}
				<div class="h6">
					Author: {user.username}
				</div>
				<div class="h6">
					Date: {date.toDateString()}
				</div>
			{/if}
		</div>

		<img class="h-32 flex-grow self-center" src={game.imgUrl} alt={'cover of ' + game.name} />
	</header>
	{#await examplesFetch()}
		<div class="placeholder animate-pulse" />
	{:then examples}
		<div
			class="my-2 grid w-full grid-flow-col grid-rows-2 flex-wrap gap-x-2 gap-y-2 overflow-auto p-2"
		>
			{#each examples as example}
				<p class="variant-filled badge">
					{example.dimension.title}
				</p>
			{/each}
		</div>
	{/await}
</div>
