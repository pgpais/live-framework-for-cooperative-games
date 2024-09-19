<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import {
		getDrawerStore,
		initializeStores,
		LightSwitch,
		TabAnchor,
		TabGroup
	} from '@skeletonlabs/skeleton';
	import type { Session, User } from 'lucia';
	import logo from '$lib/assets/framework-logo-text.png';
	import { string } from 'zod';
	import { Menu } from 'lucide-svelte';
	import Login from '$lib/components/Sessions/Login.svelte';

	export let session: Session | null;

	// initializeStores();

	const drawerStore = getDrawerStore();

	function navigationDrawerOpen(): void {
		drawerStore.open({ id: 'nav-menu', position: 'left', width: 'w-[280px] md:w-[480px]' });
	}
</script>

<div class="flex h-full justify-between gap-10 bg-primary-500 p-5">
	<div class="flex">
		<!-- Hamburger menu -->
		<button class="btn btn-sm mr-4 2xl:hidden" on:click={navigationDrawerOpen}>
			<Menu color="black" />
		</button>

		<a href="/" class="flex h-full flex-col-reverse"
			><img
				src={logo}
				class="h-full w-[350px] min-w-[330px] object-contain align-bottom"
				alt="Website logo"
			/></a
		>
	</div>
	<div class="hidden max-w-5xl flex-grow flex-col-reverse flex-wrap 2xl:flex">
		<TabGroup
			hover="hover:variant-filled-secondary"
			active="text-black bg-surface-300"
			regionList="flex-wrap"
			justify="justify-between"
		>
			<TabAnchor href="/" selected={$page.url.pathname === '/'} class="text-surface-800">
				Home
			</TabAnchor>
			<TabAnchor
				href="/frameworks"
				selected={$page.url.pathname == '/frameworks'}
				class="text-surface-800"
			>
				Framework
			</TabAnchor>
			<TabAnchor
				href="/frameworks/search"
				selected={$page.url.pathname.includes('/frameworks/')}
				class="text-surface-800"
			>
				Community
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
	<div class="card variant-filled-primary hidden place-items-end gap-4 p-4 xl:flex">
		<Login {session} />
		<LightSwitch />
	</div>
</div>
