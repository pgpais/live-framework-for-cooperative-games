<script lang="ts">
	import type { Dimension } from '$lib/db/schema';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let dimension: Dimension;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover' + dimension.id,
		placement: 'top'
	};

	console.log(dimension);
</script>

<b use:popup={popupHover} class="text-primary-500-400-token">{dimension.title}</b>

<div class="card p-4 bg-surface-active-token" data-popup={'popupHover' + dimension.id}>
	<h1 class="h1">{dimension.title}</h1>
	<p>{dimension.description}</p>
	<div class="arrow bg-surface-active-token" />
</div>
