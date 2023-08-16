import { kv } from '@vercel/kv';

/**
 * @param {{ params: { id: string }; }} context
 */
export async function load({ params }) {
	const [daimoku, info] = await Promise.all([
		kv.get(`daimoku-${params.id}`),
		kv.hmget(`${params.id}-info`, 'name', 'phrase', 'objective')
	]);

	return {
		daimoku,
		id: params.id,
		info
	};
}
