<script lang="ts">
	import DimensionDetailButton from '$lib/components/DetailElements/DimensionDetailButton.svelte';
	import type { Dimension } from '$lib/db/schema';

	export let dimension: Dimension;
</script>

<div class="text-left">
	<!-- {dimension.title} -->
	<p><DimensionDetailButton {dimension} /></p>
</div>
