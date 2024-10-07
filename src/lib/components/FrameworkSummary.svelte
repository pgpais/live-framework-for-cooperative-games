<script lang="ts">
	import { Framework, User } from '$lib/db/schema';
	import { Trash2 } from 'lucide-svelte';

	export let framework: Framework;
	let date: Date = new Date(framework.createdAt);
	export let user: User;
	export let authenticatedAsUser: boolean = false;

	function confirmDeleteFramework() {}
</script>

<div class="card variant-ringed-surface card-hover">
	<header class="h3 card-header flex h-56 flex-col items-center gap-2">
		<div class="flex w-full">
			<div class="grow">
				<a href={'/framework/' + framework.id} class="h3">{framework.title}</a>
			</div>
			{#if authenticatedAsUser}
				<div class="flex shrink">
					<button class="btn-icon btn-icon-base" on:click={confirmDeleteFramework}>
						<Trash2 class="place-self-center" />
					</button>
				</div>
			{/if}
		</div>

		<div class="flex w-2/3 justify-between">
			{#if user}
				<div class="h6">
					Author: {user.username}
				</div>
				<div class="h6">
					Date: {date.toDateString()}
				</div>
			{/if}
		</div>
	</header>
	<div class="placeholder animate-pulse" />
</div>
