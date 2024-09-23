<script lang="ts">
	import type { Game, Genre, NewGame } from '$lib/db/schema';

	export let game: NewGame & { genres?: Genre[] };
	export let introTitle: string | undefined = undefined;
</script>

<div class="card variant-ghost-tertiary flex flex-col gap-4 p-5 md:flex-row">
	<div class="card-header flex flex-col gap-2 md:w-1/3">
		<h3 class="h3">
			{#if introTitle} {introTitle}: {/if}
			{game.name}
		</h3>
		{#if game.imgUrl}
			<img src={game.imgUrl} alt={game.name} class="h-64 w-full object-contain" />
		{:else}
			<div class="variant-outline-warning flex h-64 w-full items-center justify-center">
				<p class="p">No image available</p>
			</div>
		{/if}
	</div>
	<div class="flex flex-col gap-4 md:w-2/3">
		<!-- {#if game.releaseDate}
			<p class="p">
				<b>Release Date: </b>{Intl.DateTimeFormat('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}).format(new Date(0).setUTCSeconds(+game.releaseDate))}
			</p>
		{/if} -->
		{#if game.genres}
			<p class="p">
				<b>Genres: </b>
				{#each game.genres as genre, index}
					<span>
						{index == game.genres.length - 1 ? genre.name : genre.name + ', '}
					</span>
				{/each}
			</p>
		{/if}
		{#if game.description}
			<p class="p"><b>Description: </b>{game.description}</p>
		{/if}
	</div>
</div>
