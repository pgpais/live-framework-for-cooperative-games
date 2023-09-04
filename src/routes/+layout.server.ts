import { DEV } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }: { locals: App.Locals }) => {
	const session = await locals.auth.validate();
	const user = session ? session.user : null;

	console.log('DEV MODE: ', DEV == 'true');

	return { user };
}) satisfies LayoutServerLoad;
