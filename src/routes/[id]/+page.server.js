import { kv } from '@vercel/kv';

/**
 * @param {{ params: { id: string }; }} context
 */
export async function load({ params }) {
	return {
		daimoku: await kv.get(`daimoku-${params.id}`),
		id: params.id
	};
}
