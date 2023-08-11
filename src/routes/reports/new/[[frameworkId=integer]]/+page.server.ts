import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { reportSchema } from '$lib/schemas/report';

export const load = (async ({ params }) => {
	const frameworkId = params.frameworkId ? +params.frameworkId : 1;
	const framework = await GetFullFrameworkById(frameworkId);

	const form = await superValidate(framework, reportSchema);

	return { framework, form };
}) satisfies PageServerLoad;
