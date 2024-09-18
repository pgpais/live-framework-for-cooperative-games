<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let src: string;
	export let name: string;
	export let width: string;
</script>

<div class="flex flex-col items-center gap-3">
	<Avatar initials="PP" {src} {width} />
	<p>{name}</p>
</div>
