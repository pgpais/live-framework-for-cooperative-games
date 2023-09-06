import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return /^([0-9])*/.test(param);
}) satisfies ParamMatcher;
