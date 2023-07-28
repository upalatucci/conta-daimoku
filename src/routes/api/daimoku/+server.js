import { kv } from '@vercel/kv';
import { json } from '@sveltejs/kit';

export async function GET() {
	const daimoku = await kv.get('daimoku');
	return json(daimoku);
}

/**
 * @param {{ request: { json: () => PromiseLike<{ daimoku: number; }> | { daimoku: number; }; }; }} context
 */
export async function POST(context) {
	const { daimoku } = await context.request.json();

	const newDaimoku = await kv.incrby('daimoku', daimoku);

	return json(newDaimoku);
}
