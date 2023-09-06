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
	<div>
		<h6 class="h6">
			{dimension.category.superCategory
				? dimension.category.superCategory.title + ' > ' + dimension.category.title
				: dimension.category.title}
		</h6>
		<h1 class="h1">{dimension.title}</h1>
		<p>{dimension.description}</p>
	</div>
{/await}
