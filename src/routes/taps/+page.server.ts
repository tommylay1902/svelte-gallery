import type { PageServerLoad } from './$types';

export const load = (async () => {
	// const room = cookies.get('room');

	// if (!room) {
	// 	throw redirect(302, '/taps/room');
	// }

	return {};
}) satisfies PageServerLoad;
