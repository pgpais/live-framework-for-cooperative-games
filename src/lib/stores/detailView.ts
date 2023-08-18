import type { PlainCategory, PlainDimension } from '$lib/db/schema';
import type { PlainDimensionExample } from '$lib/db/schema/dimensionExample';
import type { SvelteComponentDev } from 'svelte/internal';
import { writable, type Writable } from 'svelte/store';

export const detailComponent: Writable<{
	component: typeof SvelteComponentDev;
	props?: DetailInfo;
}> = writable();
export const detailInfoStore: Writable<DetailInfo> = writable();

export type DetailInfo =
	| { type: 'dimension'; data: DetailInfoDimension }
	| { type: 'category'; data: DetailInfoCategory };

export type DetailInfoDimension = PlainDimension & {
	examples?: PlainDimensionExample[];
};

export type DetailInfoCategory = PlainCategory;
