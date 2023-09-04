import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }: { locals: App.Locals }) => {
	const session = await locals.auth.validate();
	const user = session ? session.user : null;

	return { user };
}) satisfies LayoutServerLoad;
