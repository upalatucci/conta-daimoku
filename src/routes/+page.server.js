import { kv } from '@vercel/kv';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		console.log(data.get('id'));
		const id = data.get('id');
		kv.set(`daimoku-${id}`, 0);

		redirect(307, `/${id}`);
	}
};
