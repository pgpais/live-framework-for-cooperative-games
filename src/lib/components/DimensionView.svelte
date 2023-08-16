<script lang="ts">
	import DimensionWithHover from '$lib/components/DimensionWithHover.svelte';
	import type { Dimension } from '$lib/db/schema';

	export let dimension: Dimension;
</script>

<div class="text-left">
	<DimensionWithHover {dimension} />
</div>
