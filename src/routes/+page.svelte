<script lang="ts">
	import AuthorView from '$lib/components/Views/AuthorView.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="flex w-full flex-col items-center gap-10 overflow-auto p-8">
	<h1 class="h1 text-center">
		Welcome to the <span class="text-secondary-500-400-token">
			Living Framework for Understanding Cooperative Games
		</span>
	</h1>
	<div class="mx-10 flex w-full max-w-lg flex-col items-center gap-5">
		<div class="card p-5">
			<p class="my-2">
				The Living Framework for Cooperative Games (LFCG), captures high-level structures
				encountered in cooperative games divided into Play Structure, Player Context and Forms of
				Cooperation; and includes a compendium of Cooperation Design Patterns. Ths framework is
				derived from a multi-step systematic analysis of 129 cooperative games with contributions of
				eleven researchers, and was <a
					href="https://dl.acm.org/doi/pdf/10.1145/3613904.3641953"
					target="_blank"
					class="anchor"
				>
					published as a scientific article in CHI 2024
				</a>.
			</p>
			<p class="my-2">
				LFCG is published as this web application to facilitate use and appropriation and can be
				used as a tool for analyses and ideation, as well as a shared language for describing a
				game’s design.
			</p>
			<div class="mt-4">
				<p>In this tool you are able to:</p>
				<ul class="list-disc pl-10">
					<li>
						<span>Browse the framework, quickly navigating through examples of each value.</span>
					</li>
					<li>
						<span
							>Create game reports through a guided process, identifying values and describing them
							with examples.</span
						>
					</li>
					<li><span>Browse reported games, with a list of examples for that game.</span></li>
				</ul>
			</div>
		</div>
		<div class="flex gap-10">
			<a href="/frameworks" class="variant-filled btn">Framework</a>
			<a href="/reports/search" class="variant-filled btn">Reports</a>
		</div>
	</div>
	<div class="mx-10 flex flex-col items-center gap-5">
		<h2 class="h2">Authors</h2>
		<div class="flex flex-wrap content-center justify-evenly gap-10">
			<AuthorView
				src="https://techandpeople.github.io/images/people/pgp.jpg"
				width="w-32"
				name="Pedro Pais"
			/>
			<AuthorView
				src="https://techandpeople.github.io/images/people/pgp.jpg"
				width="w-32"
				name="Pedro Pais"
			/>
			<AuthorView
				src="https://techandpeople.github.io/images/people/pgp.jpg"
				width="w-32"
				name="Pedro Pais"
			/>
			<AuthorView
				src="https://techandpeople.github.io/images/people/pgp.jpg"
				width="w-32"
				name="Pedro Pais"
			/>
			<AuthorView
				src="https://techandpeople.github.io/images/people/pgp.jpg"
				width="w-32"
				name="Pedro Pais"
			/>
		</div>
	</div>
</div>
