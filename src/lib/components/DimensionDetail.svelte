<script lang="ts">
	import type { PlainDimension } from '$lib/db/schema';
	import type { DetailInfo } from '$lib/stores/detailView';

	export let data: PlainDimension;
</script>

<div>
	<h1 class="h1">{data.title}</h1>
	<p>{data.description}</p>
</div>
