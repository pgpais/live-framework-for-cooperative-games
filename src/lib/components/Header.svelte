<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { LightSwitch, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import type { Session, User } from 'lucia';

	export let session: Session | null;
</script>

<div class="bg-surface-100-800-token flex justify-between p-5">
	<div>logo</div>
	<TabGroup>
		<TabAnchor href="/frameworks" selected={$page.url.pathname === '/frameworks'}>
			Consult Framework
		</TabAnchor>
		<TabAnchor href="/frameworks/search" selected={$page.url.pathname === '/frameworks/search'}>
			Community Frameworks
		</TabAnchor>
		<TabAnchor href="/reports/new" selected={$page.url.pathname === '/reports/new'}>
			New Report
		</TabAnchor>
		<TabAnchor href="/frameworks/new" selected={$page.url.pathname === '/frameworks/edit'}>
			New Framework
		</TabAnchor>
		<TabAnchor href="/reports/search" selected={$page.url.pathname === '/reports/search'}>
			Game Analysis
		</TabAnchor>
		<!-- <TabAnchor href="/dimensions">Dimensions</TabAnchor> -->
	</TabGroup>
	<div class="flex flex-col">
		<LightSwitch />
		{#if session}
			<p>Hello, {session.user.full_name}</p>
			<form method="POST" action="/logout" use:enhance>
				<input type="submit" class="btn variant-filled-primary" value="Sign out" />
			</form>
		{:else}
			<a class="btn variant-filled-primary" href="/login/github"> Sign in with Github </a>
		{/if}
	</div>
</div>
