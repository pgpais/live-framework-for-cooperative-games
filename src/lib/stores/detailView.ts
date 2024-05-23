import type { Category, Dimension, FullCategory, PlainDimension } from '$lib/db/schema';
import type { DimensionExample, PlainDimensionExample } from '$lib/db/schema/dimensionExample';
import { writable, type Writable } from 'svelte/store';

export const detailInfoStore: Writable<DetailInfo> = writable();

export type DetailInfo = {
	type: 'dimension' | 'category';
	data: DetailInfoData;
};

export type DetailInfoData = {
	title: string;
	id: number;
	description: string;
	isOfficial: boolean;
};

//TODO: This should hold all info for detail view. New Framework forms and Game Detail Views should also be here
