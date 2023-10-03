<script lang="ts">
	import type { DimensionDetail } from '$lib/db/schema';
	import { detailInfoStore } from '$lib/stores/detailView';
	import { Loader2 } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	let response: Promise<DimensionDetail>;
	let isOfficial: boolean;

	function isImage(url: string) {
		return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
	}

	$: {
		isOfficial = $detailInfoStore.data.isOfficial;
		response = fetch(`/api/dimensions/${$detailInfoStore.data.id}`).then((res) => res.json());
	}
</script>

{#if isOfficial}
	{#await response}
		<Loader2 class="animate-spin" />
	{:then dimension}
		<div class="p-6">
			<div class="h6">
				{dimension.category.superCategory
					? dimension.category.superCategory.title + ' > ' + dimension.category.title
					: dimension.category.title}
			</div>
			<h1 class="h1">{dimension.title}</h1>
			<p>{dimension.description}</p>
			{#if dimension.dimensionExamples}
				<div class="flex flex-col gap-5 pt-6">
					<h3 class="h3">Examples:</h3>
					{#each dimension.dimensionExamples as example}
						<div class="card variant-ghost-surface flex h-fit flex-col gap-2 p-5">
							<h4 class="h4 card-header mt-0 pt-0"><b>{example.report.game.name}</b></h4>
							<div class="w-full">
								<!-- TODO: if example has image, show it here -->
								{#if example.imageURL && isImage(example.imageURL)}
									<img
										src={example.imageURL}
										alt="Attached to example"
										class="h-56 w-full place-self-center object-contain"
									/>
								{:else if example.report.game.imgUrl && isImage(example.report.game.imgUrl)}
									<img
										src={example.report.game.imgUrl}
										alt="Game cover"
										class="h-56 w-full place-self-center object-contain"
									/>
								{:else}
									<div class="variant-outline-warning flex h-60 items-center justify-center">
										<p class="p">No image available</p>
									</div>
								{/if}
							</div>
							<p class="line-clamp-3">
								{example.example}
							</p>
						</div>
					{/each}
				</div>
				<div class="variant-glass-surface sticky bottom-0 left-0 right-0 flex h-16 justify-center">
					<a
						class="variant-filled-primary btn h-10 self-center rounded-lg"
						href={`/dimensions/${dimension.id}`}
						target="_blank"
					>
						See more
					</a>
				</div>
			{/if}
		</div>
	{/await}
{:else}
	<div class="p-6">
		<h1 class="h1">{$detailInfoStore.data.title}</h1>
		<p>{$detailInfoStore.data.description}</p>
	</div>
{/if}
