<script lang="ts">
	import { setContext } from 'svelte';
	import '../app.css';
	import { io } from 'socket.io-client';
	const socket = io('http://localhost:3000');
	socket.on('roomJoined', () => {
		console.log('join!');
	});
	setContext('socket', socket);
</script>

<slot />
