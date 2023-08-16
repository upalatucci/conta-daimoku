import { kv } from '@vercel/kv';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const id = data.get('id');
		const name = data.get('name');
		const phrase = data.get('phrase');
		const objective = data.get('objective');

		await Promise.all([
			kv.set(`daimoku-${id}`, 0),

			kv.hmset(`${id}-info`, {
				name,
				phrase,
				objective
			})
		]);

		throw redirect(307, `/${id}`);
	}
};
