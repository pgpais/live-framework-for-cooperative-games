<script lang="ts">
	import type { Game, Genre, NewGame } from '$lib/db/schema';

	export let game: NewGame & { reportsCount: unknown };
	export let onClick;
</script>

<button class="card variant-filled-tertiary card-hover flex flex-col content-around w-60 justify-between my-2" on:click={onClick}>
	<header class="card-header">
		<h2 class="card-title"><b>{game.name}</b></h2>
	</header>

	<section class="flex flex-col gap-2 pl-8 pr-8 place-self-center mt-4 mb-4 justify-between">
		<p>{game.reportsCount ? game.reportsCount : 0} report{game.reportsCount != 1 ? 's' : ''}</p>
		{#if game.imgUrl}
			<img
				class="w-full rounded-lg object-scale-down"
				src={game.imgUrl}
				alt={'cover of ' + game.name}
			/>
		{:else}
			<div class="variant-outline-warning flex h-64 w-full items-center justify-center">
				<p class="p">No image available</p>
			</div>
		{/if}
	</section>
</button>