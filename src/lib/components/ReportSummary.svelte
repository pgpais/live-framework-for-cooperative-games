<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { DimensionExample, Game, Report, User, Dimension } from '$lib/db/schema';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { Session } from 'lucia';
	import { Eye, Trash, Trash2, EyeOff, Loader2, Download } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let report: Report;
	export let game: Game;
	export let user: User | undefined = undefined;
	export let authenticatedAsUser: boolean = false;
	export let onDeleteReport: (report: Report) => void;

	let isLoading: boolean = false;

	const modalStore = getModalStore();

	let examplesFetch: () => Promise<(DimensionExample & { dimension: Dimension })[]> = async () => {
		const res = fetch('/api/examples/byReport/' + report.id).then((res) => res.json());
		return res;
	};

	async function swapReportPublic() {
		const newReport = report;
		newReport.public = !newReport.public;

		isLoading = true;
		const response = await fetch(`/api/reports/${report.id}`, {
			method: 'PUT',
			body: JSON.stringify(newReport),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response) {
			report = newReport;
			isLoading = false;
		}
	}

	function confirmDeleteReport() {
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Please Confirm',
			body: 'Are you sure you wish to proceed?',
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (r: boolean) => {
				if (r) {
					deleteReport();
				}
			}
		};
		modalStore.trigger(modal);
	}
	async function deleteReport() {
		isLoading = true;
		const response = await fetch(`/api/reports/${report.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response) {
			onDeleteReport(report);
			isLoading = false;
		}
	}

	let date: Date = new Date(report.createdAt);
</script>

<div class="card variant-ringed-surface card-hover w-80">
	<header class="card-header flex flex-col items-center gap-2">
		<div class="flex w-full justify-between">
			<div class="line-clamp-1">
				<a href={'/reports/' + report.id} class="h4">{game.name}</a>
			</div>
			<div class="flex shrink gap-2">
				{#if isLoading}
					<Loader2 class="animate-spin" />
				{:else}
					<a class="btn-icon btn-icon-sm" href={'/api/reports/print/' + report.id}>
						<Download class="place-self-center" />
					</a>
					{#if authenticatedAsUser}
						{#if report.public}
							<button on:click={swapReportPublic} class="btn-icon btn-icon-sm">
								<Eye />
							</button>
						{:else}
							<button on:click={swapReportPublic} class="btn-icon btn-icon-sm">
								<EyeOff />
							</button>
						{/if}
						<button class="btn-icon btn-icon-sm" on:click={confirmDeleteReport}>
							<Trash2 class="place-self-center" />
						</button>
					{/if}
				{/if}
			</div>
		</div>

		<div class="flex w-2/3 flex-col justify-between">
			{#if user}
				<div class="h6 line-clamp-1">
					Author: {user.username}
				</div>
				<div class="h6 line-clamp-1">
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
