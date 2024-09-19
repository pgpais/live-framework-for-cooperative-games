<script lang="ts">
	import type { DimensionDetail, DimensionExample, dimensionExamples, Game } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';
	import { ChevronLeft, Loader2 } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import Giscus from '@giscus/svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	export let isDrawer: boolean = false;

	let response: Promise<DimensionDetail>;
	let examplesResponse: Promise<(Game & { examples: DimensionExample[] })[]>;
	let isOfficial: boolean;

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	function isImage(url: string) {
		return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
	}

	$: {
		isOfficial = $detailInfoStore.data.isOfficial;
		response = fetch(`/api/dimensions/${$detailInfoStore.data.id}`).then((res) => res.json());
		examplesResponse = fetch(`api/examples/byDimension/${$detailInfoStore.data.id}`).then((res) =>
			res.json()
		);
	}
</script>

{#if isOfficial}
	{#await response}
		<Loader2 class="animate-spin" />
	{:then dimension}
		<div class="p-6">
			<div class="flex items-center">
				{#if isDrawer}
					<button on:click={drawerClose} class="p-4">
						<ChevronLeft />
					</button>
				{/if}
				<div class="h6">
					{dimension.category.superCategory
						? dimension.category.superCategory.title + ' > ' + dimension.category.title
						: dimension.category.title}
				</div>
			</div>
			<h1 class="h1">{dimension.title}</h1>
			<p>{dimension.description}</p>
			<div class="flex flex-col gap-5 pt-6">
				<h3 class="h3">Examples:</h3>
				{#await examplesResponse}
					<div class="card variant-ghost-surface flex h-fit flex-col gap-2 p-5">
						<div class="placeholder h4 card-header mt-0 w-32 animate-pulse pt-0" />
						<div
							class="placeholder h-56 w-52 animate-pulse place-self-center rounded-none object-contain"
						/>
						<!-- <div class="card variant-ghost-primary flex flex-col gap-4 p-8">
						<div
							class="placeholder h-56 w-52 animate-pulse place-self-center rounded-none object-contain"
						/>
					</div> -->
					</div>
				{:then games}
					{#each games as game}
						<div class="card variant-ghost-surface flex h-fit flex-col gap-2 p-5">
							<h4 class="h4 card-header mt-0 pt-0"><b>{game.name}</b></h4>
							{#if game.imgUrl && isImage(game.imgUrl)}
								<img
									src={game.imgUrl}
									alt="Game cover"
									class="h-56 w-full place-self-center object-contain"
								/>
							{:else}
								<div class="variant-outline-warning flex h-60 items-center justify-center">
									<p class="p">No image available</p>
								</div>
							{/if}
							{#each game.examples as example}
								<a
									href={`/reports/${example.reportId}`}
									target="_blank"
									class="card variant-ghost-primary card-hover flex flex-col gap-4 p-8"
								>
									<!-- TODO: if example has image, show it here -->
									{#if example.imageURL && isImage(example.imageURL)}
										<img
											src={example.imageURL}
											alt="Attached to example"
											class="h-56 w-full place-self-center object-contain"
										/>
									{/if}
									{#if example.example}
										<p class="line-clamp-3">
											{example.example}
										</p>
									{/if}
								</a>
							{/each}
						</div>
					{/each}
				{/await}
			</div>
			<Giscus
				id="comments"
				repo="pgpais/live-framework-for-cooperative-games"
				repoId="R_kgDOKEw5gg"
				category="Framework Discussions"
				categoryId="DIC_kwDOKEw5gs4ChxWY"
				mapping="specific"
				term={(dimension.category.superCategory
					? dimension.category.superCategory.title + ' > '
					: '') +
					dimension.category.title +
					' > ' +
					dimension.title}
				emitMetadata="0"
				reactionsEnabled="1"
				inputPosition="top"
				theme="preferred_color_scheme"
				lang="en"
				loading="lazy"
			/>
		</div>
	{/await}
{:else}
	<div class="p-6">
		<h1 class="h1">{$detailInfoStore.data.title}</h1>
		<p>{$detailInfoStore.data.description}</p>
	</div>
{/if}
