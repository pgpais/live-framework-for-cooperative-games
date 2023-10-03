<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { LightSwitch, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import type { Session, User } from 'lucia';
	import logo from '$lib/assets/framework-logo-text.png';
	import { string } from 'zod';

	export let session: Session | null;
</script>

<div class="flex h-full justify-between bg-surface-200 p-5 gap-10">
	<a href="/" class="flex h-full flex-col-reverse"
		><img src={logo} class="h-full w-96 object-scale-down align-bottom" alt="Website logo" /></a
	>
	<div class="flex flex-grow flex-col-reverse flex-wrap">
		<TabGroup
			hover="hover:variant-filled-secondary"
			active="text-black bg-surface-300"
			justify="justify-evenly"
			regionList="flex-wrap"
		>
			<TabAnchor
				href="/"
				selected={$page.url.pathname === '/'}
				class="text-surface-800"
			>
				Consult Framework
			</TabAnchor>
			<TabAnchor
				href="/frameworks/search"
				selected={$page.url.pathname.includes('/frameworks')}
				class="text-surface-800"
			>
				Community Frameworks
			</TabAnchor>
			<TabAnchor
				href="/reports/new"
				selected={$page.url.pathname.includes('/reports/new')}
				class="text-surface-800"
			>
				New Report
			</TabAnchor>
			<TabAnchor
				href="/frameworks/new"
				selected={$page.url.pathname.includes('/frameworks/new')}
				class="text-surface-800"
			>
				New Framework
			</TabAnchor>
			<TabAnchor
				href="/reports/search"
				selected={$page.url.pathname.includes('/reports/search')}
				class="text-surface-800"
			>
				Game Analysis
			</TabAnchor>
			<!-- <TabAnchor href="/dimensions">Dimensions</TabAnchor> -->
		</TabGroup>
	</div>
	<div class="flex flex-col">
		<LightSwitch />
		{#if session}
			<p class="text-surface-800 accent">Hello, {session.user.full_name}</p>
			<form method="POST" action="/logout" use:enhance>
				<input type="submit" class="variant-filled-secondary btn" value="Sign out" />
			</form>
		{:else}
			<a class="variant-filled-secondary btn" href="/login/github"> Sign in with Github </a>
		{/if}
	</div>
</div>
