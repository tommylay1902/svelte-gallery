import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import v4 from 'uuidv4';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	createRoom: async ({ cookies }) => {
		const roomName = 'hello';

		if (roomName) {
			const playerId = v4.uuid();

			cookies.set('room', playerId);
			throw redirect(302, '/taps');
		}
	},

	joinRoom: async ({ cookies }) => {
		const roomName = 'hello';

		if (roomName) {
			const playerId = v4.uuid();

			cookies.set('room', playerId);
			throw redirect(302, `/taps?player=${playerId}`);
		}
	}
};
