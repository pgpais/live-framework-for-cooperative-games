<script lang="ts">
	import type { Dimension } from '$db/schema';

	export let dimension: Dimension;
</script>

<div class="text-left">
	<p>{dimension.title}</p>
</div>
