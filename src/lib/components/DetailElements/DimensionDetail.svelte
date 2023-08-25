<script lang="ts">
	import type { PlainDimension } from '$lib/db/schema';

	export let data: PlainDimension;
</script>

<div>
	<!-- TODO: Get parent category (send in data?) -->
	<h6 class="h6">Parent Category</h6>
	<h1 class="h1">{data.title}</h1>
	<p>{data.description}</p>
</div>
