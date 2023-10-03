<script lang="ts">
	import type { PageData } from './$types';
	import type { Report } from '$lib/db/schema';
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';
	import FrameworkView from '$lib/components/FrameworkView.svelte';
	import DetailView from '$lib/components/DetailView.svelte';

	export let data: PageData;
	const report: Report = data.report;
	const game = data.game;
	const framework = data.framework;
	const dimensionExamples = data.dimensionExamples;
</script>

<ThreeColumnLayout>
	<div class="m-5 flex flex-col gap-2">
		<div class="card bg-tertiary-800 p-8 flex justify-stretch gap-8">
			<img src={game.imgUrl} alt={game.name} class="h-64 w-fit object-contain" />
			<div class="flex flex-col">
				<h3 class="text-3xl mb-3"><b>{game.name}</b></h3>
				<p class="line-clamp-6 text-sm">{game.description}</p>
				<p class="py-5">Created on framework {framework.title}</p>
				<a
					class="btn-primary variant-filled-primary btn mt-4 w-52 place-self-center"
					href={'/api/reports/print/' + report.id}>Download Report as PDF</a
				>
			</div>
		</div>
		<!-- <div class="card variant-ghost-primary p-5"> -->
			<FrameworkView {framework} {dimensionExamples} showTitle={false} />
		<!-- </div> -->
	</div>
	<DetailView slot="right" />
</ThreeColumnLayout>
