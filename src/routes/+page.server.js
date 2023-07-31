import { kv } from '@vercel/kv';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const id = data.get('id');
		await kv.set(`daimoku-${id}`, 0);

		throw redirect(307, `/${id}`);
	}
};
