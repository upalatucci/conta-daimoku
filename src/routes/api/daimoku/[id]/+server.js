import { kv } from '@vercel/kv';
import { json } from '@sveltejs/kit';

/**
 * @param {{ params:  { id: string }; }} context
 */
export async function GET(context) {
	const { id } = context.params;
	const daimoku = await kv.get(`daimoku-${id}`);
	return json(daimoku);
}

/**
 * @param {{ params:  { id: string }, request: { json: () => PromiseLike<{ daimoku: number; }> | { daimoku: number; }; }; }} context
 */
export async function POST(context) {
	const { id } = context.params;
	const { daimoku } = await context.request.json();

	const newDaimoku = await kv.incrby(`daimoku-${id}`, daimoku);

	return json(newDaimoku);
}
