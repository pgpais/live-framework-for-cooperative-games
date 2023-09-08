<script lang="ts">
	import type { DimensionDetail } from '$lib/db/schema';
	import { detailInfoStore, type DetailInfoDimension } from '$lib/stores/detailView';
	import { Loader2 } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	let response: Promise<DimensionDetail>;

	$: {
		response = fetch(`/api/dimensions/${$detailInfoStore.data.id}`).then((res) => res.json());
	}
</script>

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
		{#if dimension.examples}
			<div class="flex flex-col gap-5 pt-6">
				<h3 class="h3">Examples:</h3>
				{#each dimension.examples as example}
					<div class="card variant-ghost-surface p-5">
						<h4 class="h4">{example.report.game.name}</h4>
						<!-- TODO: if example has image, show it here -->
						{#if example.report.game.imgUrl}
							<img src={example.report.game.imgUrl} alt="Game cover" class="h-40" />
						{:else}
							<div class="variant-outline-warning flex h-40 w-40 items-center justify-center">
								<p class="p">No image available</p>
							</div>
						{/if}
						<p>{example.example}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="variant-glass-surface sticky bottom-0 left-0 right-0 flex h-16 justify-center">
		<a
			class="btn variant-filled-primary h-10 self-center rounded-lg"
			href={`/dimensions/${dimension.id}`}>See more</a
		>
	</div>
{/await}
