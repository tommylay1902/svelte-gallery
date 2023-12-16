<script lang="ts">
	import { setContext } from 'svelte';
	import '../app.css';
	import { io } from 'socket.io-client';
	const socket = io('https://tapsws.onrender.com');
	socket.on('roomJoined', () => {
		console.log('join!');
	});
	setContext('socket', socket);
</script>

<slot />
