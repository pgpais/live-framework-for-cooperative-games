<script lang="ts">
	import DimensionDetailButton from '$lib/components/DimensionDetailButton.svelte';
	import type { Dimension } from '$lib/db/schema';

	export let dimension: Dimension;
</script>

<div class="text-left">
	<DimensionDetailButton {dimension} />
</div>
