import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { frameworkEditFormSchema } from '$lib/schemas/frameworkEdit';

export const load = (async ({ params }) => {
	const framework = await GetFullFrameworkById(params.id ? +params.id : 1);

	const form = await superValidate(frameworkEditFormSchema);

	return { framework, form };
}) satisfies PageServerLoad;
