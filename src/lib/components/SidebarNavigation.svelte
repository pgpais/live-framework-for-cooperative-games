<script lang="ts">
	import { AppRail, getDrawerStore, LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	$: listboxItemActiveIncludes = (href: string) =>
		$page.url.pathname?.includes(href) ? 'bg-primary-active-token' : '';
	$: listboxItemActive = (href: string) =>
		$page.url.pathname === href ? 'bg-primary-active-token' : '';
</script>

<!-- ATTENTION: WHEN UPDATING THIS COMPONENT, DON'T FORGET TO UPDATE THE OTHER NAVBAR IN THE HEADER -->
<AppRail width="w-full">
	<nav class="list-nav">
		<ul>
			<li>
				<a
					href="/"
					class={listboxItemActive('/')}
					data-sveltekit-preload-data="hover"
					on:keypress
					on:click={drawerStore.close}>Home</a
				>
			</li>
			<li>
				<a
					href="/frameworks/search"
					class={listboxItemActiveIncludes('/frameworks/search')}
					data-sveltekit-preload-data="hover"
					on:keypress
					on:click={drawerStore.close}>Community</a
				>
			</li>
			<li>
				<a
					href="/reports/new"
					class={listboxItemActiveIncludes('/reports/new')}
					data-sveltekit-preload-data="hover"
					on:keypress
					on:click={drawerStore.close}>New Report</a
				>
			</li>
			<li>
				<a
					href="/frameworks/new"
					class={listboxItemActiveIncludes('/frameworks/new')}
					data-sveltekit-preload-data="hover"
					on:keypress
					on:click={drawerStore.close}>New Framework</a
				>
			</li>
			<li>
				<a
					href="/reports/search"
					class={listboxItemActiveIncludes('/reports/search')}
					data-sveltekit-preload-data="hover"
					on:keypress
					on:click={drawerStore.close}>Game Analysis</a
				>
			</li>
		</ul>
	</nav>
	<div slot="trail" class="m-8 flex justify-between">
		<div>login</div>
		<LightSwitch />
	</div>
</AppRail>

<!-- <TabAnchor
				href="/"
				selected={$page.url.pathname === '/'}
				class="text-surface-800"
			>
				Home
			</TabAnchor>
			<TabAnchor
				href="/frameworks/search"
				selected={$page.url.pathname.includes('/frameworks')}
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
			</TabAnchor> -->
