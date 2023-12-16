import type { Socket } from 'socket.io-client';
import { writable } from 'svelte/store';

export const websocket = writable<Socket | null>();
