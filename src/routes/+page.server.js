import { kv } from '@vercel/kv';

export async function load() {
	return {
		daimoku: await kv.get('daimoku')
	};
}
