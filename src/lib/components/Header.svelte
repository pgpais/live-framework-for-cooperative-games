<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { LightSwitch, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import type { Session, User } from 'lucia';
	import logo from '$lib/assets/framework-logo-text.png';
	import { string } from 'zod';

	export let session: Session | null;
</script>

<div class="bg-surface-800-100-token flex h-full justify-between p-5">
	<img src={logo} class="h-full" alt="Website logo" />
	<div class="flex flex-grow flex-col-reverse flex-wrap">
		<TabGroup
			hover="hover:variant-filled-secondary"
			active="variant-soft-surface"
			justify="justify-evenly"
			regionList="flex-wrap"
		>
			<TabAnchor
				href="/frameworks"
				selected={$page.url.pathname.endsWith('/frameworks')}
				class="text-surface-100-800-token"
			>
				Consult Framework
			</TabAnchor>
			<TabAnchor
				href="/frameworks/search"
				selected={$page.url.pathname.includes('/frameworks/search')}
				class="text-surface-100-800-token"
			>
				Community Frameworks
			</TabAnchor>
			<TabAnchor
				href="/reports/new"
				selected={$page.url.pathname.includes('/reports/new')}
				class="text-surface-100-800-token"
			>
				New Report
			</TabAnchor>
			<TabAnchor
				href="/frameworks/new"
				selected={$page.url.pathname.includes('/frameworks/edit')}
				class="text-surface-100-800-token"
			>
				New Framework
			</TabAnchor>
			<TabAnchor
				href="/reports/search"
				selected={$page.url.pathname.includes('/reports/search')}
				class="text-surface-100-800-token"
			>
				Game Analysis
			</TabAnchor>
			<!-- <TabAnchor href="/dimensions">Dimensions</TabAnchor> -->
		</TabGroup>
	</div>
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
