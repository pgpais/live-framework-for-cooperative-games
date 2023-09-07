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
		<div class="card variant-ghost-primary flex justify-stretch gap-2 p-2">
			<img src={game.imgUrl} alt={game.name} class="h-64 w-fit object-contain" />
			<div class="flex flex-col">
				<h2 class="h2">Report on {game.name}</h2>
				<p>{game.description}</p>
			</div>
		</div>
		<div class="card variant-ghost-primary p-5">
			<FrameworkView {framework} {dimensionExamples} />
		</div>
	</div>
	<DetailView slot="right" />
</ThreeColumnLayout>
