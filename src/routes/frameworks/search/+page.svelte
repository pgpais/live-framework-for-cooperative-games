<script lang="ts">
	import ThreeColumnLayout from '$lib/components/layouts/ThreeColumnLayout.svelte';
	import { Loader, SearchIcon } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { navigating, page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data: PageData;
	$: frameworks = data.frameworks;

	let query = data.query;
	let pageNumber = data.page;
</script>

<ThreeColumnLayout>
	<div class="flex flex-col">
		<div class="m-5 flex place-items-center">
			<form>
				<input class="input" type="text" bind:value={query} placeholder="Search for something" />
			</form>
			<button
				class="btn-primary btn"
				on:click={() => {
					let searchParams = new URLSearchParams($page.url.searchParams.toString());

					searchParams.set('q', String(query));

					goto(`?${searchParams.toString()}`);
				}}
			>
				<SearchIcon />
			</button>
			{#if $navigating}
				<Loader class="animate-spin" />
			{/if}
		</div>
		<div class="m-5 grid grid-cols-1 gap-5">
			{#each frameworks as framework}
				<a class="card variant-filled-tertiary p-4" href={`/frameworks/${framework.id}`}>
					<header class="h3 card-header">{framework.title}</header>
					<section class="m-4 line-clamp-3">
						<p>{framework.description}</p>
					</section>
					<footer class="card-footer">
						Created by {framework.author.fullName}
					</footer>
				</a>
			{/each}
		</div>
	</div>
</ThreeColumnLayout>
