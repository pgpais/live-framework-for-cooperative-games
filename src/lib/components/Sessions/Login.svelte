<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Session } from 'lucia';

	export let session: Session | null;
</script>

<div>
	{#if session}
		<p class="">Hello, {session.user.full_name}</p>
		<form method="POST" action="/logout" use:enhance>
			<input type="submit" class="variant-filled-tertiary btn" value="Sign out" />
		</form>
	{:else}
		<a class="variant-filled-tertiary btn" href="/login/github"> Sign in with Github </a>
	{/if}
</div>
