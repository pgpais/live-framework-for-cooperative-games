<script lang="ts">
	import type { PlainCategory } from '$lib/db/schema';

	export let data: PlainCategory;
</script>

<div>
	<h1 class="h1">{data.title}</h1>
	<p>{data.description}</p>
</div>
