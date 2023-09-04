<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col">
	<h1 class="h1">
		You have been logged out, you will be returned to the homepage... Click the button if the
		redirect fails
	</h1>
	<a class="btn variant-filled" href="/">Return to homepage</a>
</div>
