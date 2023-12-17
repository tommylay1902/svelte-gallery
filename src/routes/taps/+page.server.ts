import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const room = url.searchParams.get('room');
	const create = url.searchParams.get('create');
	// const room = cookies.get('room');

	if (!room) {
		throw redirect(302, '/taps/room');
	}

	return { room, create };
}) satisfies PageServerLoad;
