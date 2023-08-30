<script lang="ts">
	import type { Game } from '$lib/db/schema';

	console.log('GameDetail.svelte');

	export let game: Game | undefined;

	let gameInfo;
</script>

{#if game}
	<div class="flex flex-col space-y-4 p-4">
		<img class="h-32 self-center" src={game.imgUrl} alt={'cover of ' + game.name} />
		<h2 class="h2 text-center text-2xl font-bold">{game.name}</h2>
		<section>
			<div class="grid gap-2">
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
			</div>
		</section>
		<section>
			<h3 class="h3">Reports</h3>
			<hr />
			<h4 class="h4">Using framework "def": X times</h4>
		</section>
	</div>
{:else}
	<div class="flex flex-col space-y-4 p-4">
		<div class="placeholder-circle h-32 self-center" />
		<div class="placeholder animate-pulse" />
		<div class="grid grid-cols-3 gap-8">
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
		</div>
		<div class="grid grid-cols-4 gap-4">
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
		</div>
	</div>
{/if}
