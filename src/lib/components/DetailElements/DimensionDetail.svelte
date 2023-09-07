<script lang="ts">
	import type { DimensionDetail } from '$lib/db/schema';
	import { detailInfoStore, type DetailInfoDimension } from '$lib/stores/detailView';
	import { Loader2 } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	let response: Promise<DimensionDetail>;

	$: {
		response = fetch(`/api/dimensions/${$detailInfoStore.data.id}`).then((res) => res.json());
	}
</script>

{#await response}
	<Loader2 class="animate-spin" />
{:then dimension}
	<div class="p-6">
		<div class="h6">
			{dimension.category.superCategory
				? dimension.category.superCategory.title + ' > ' + dimension.category.title
				: dimension.category.title}
		</div>
		<h1 class="h1">{dimension.title}</h1>
		<p>{dimension.description}</p>
		<div class="pt-6">
			<h3 class="h3">Examples:</h3>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sapien nisi, vulputate vel
				sem ac, gravida placerat risus. Quisque sodales, tortor in porta vulputate, sem tortor
				tempor urna, sit amet placerat lacus tortor ut nisl. Nulla finibus mollis tellus in
				interdum. Sed a neque porttitor, cursus ipsum quis, fringilla velit. Suspendisse non massa
				nec purus placerat ullamcorper eget in diam. Aliquam quis ligula vehicula, scelerisque sem
				vel, sodales nibh. Nullam blandit pulvinar sodales. Nunc luctus ante mauris, quis rhoncus
				nisi consectetur non. Donec magna nisi, pulvinar non nisl sed, ultrices sodales nisl. Nulla
				facilisi. Donec hendrerit tortor euismod urna pharetra vulputate. Morbi nec diam volutpat,
				consequat lorem non, ullamcorper quam. Vestibulum et libero suscipit, rutrum mi sit amet,
				consequat massa. Maecenas eleifend arcu eget feugiat luctus. Nunc eros lacus, imperdiet
				malesuada consequat suscipit, finibus vitae arcu. Etiam fermentum arcu mauris, sed vehicula
				diam facilisis eget. Ut fermentum sapien ut augue pellentesque dapibus non in massa. Quisque
				sagittis, tellus vitae consequat pretium, lorem velit vulputate mauris, at suscipit nunc
				nisi id erat. Fusce neque felis, blandit non semper eu, consequat vel mi. Nam interdum quam
				ex, in cursus leo hendrerit ac. In molestie condimentum lectus. Phasellus et nibh magna.
				Etiam laoreet tortor rhoncus ligula laoreet dapibus. Nam maximus libero vitae mattis
				fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
				curae; Duis ut ante id mi interdum molestie. Proin venenatis egestas dolor id ultricies.
				Aenean dignissim purus quis tincidunt maximus. Nunc pellentesque nulla et nulla malesuada
				dapibus. Phasellus scelerisque rhoncus fermentum. Pellentesque feugiat ac mi feugiat
				suscipit. Duis nunc purus, consequat non lectus non, sodales maximus nunc. Duis aliquam,
				ipsum sit amet consectetur suscipit, neque turpis consectetur ex, id fermentum sem enim nec
				mauris. Quisque sed ipsum nisi. Praesent posuere eros a nunc ultricies, sagittis aliquet
				nunc ullamcorper. Maecenas hendrerit eros nec quam aliquet mattis. Praesent rhoncus ligula
				ut nunc imperdiet ullamcorper. Morbi non ex mollis odio egestas venenatis in eget eros.
				Mauris fringilla ex magna, a ultricies dui rhoncus in. Praesent scelerisque, sapien vitae
				dictum rutrum, enim ante luctus augue, tempor elementum ex nulla eu ipsum. Class aptent
				taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras sed nunc
				dignissim, interdum elit nec, condimentum sapien. Nunc id metus lacus. Cras quam nulla,
				convallis ut quam non, tristique tempor mauris. Donec ac quam feugiat, posuere tortor eget,
				mattis sapien. Duis consectetur justo posuere, vehicula sapien eu, volutpat odio. Maecenas
				ut justo id tortor porta tincidunt.
			</p>
		</div>
	</div>
	<div class="variant-glass-surface sticky bottom-0 left-0 right-0 flex h-16 justify-center">
		<a
			class="btn variant-filled-primary h-10 self-center rounded-lg"
			href={`/dimensions/${dimension.id}`}>See more</a
		>
	</div>
{/await}
