<script lang="ts">
	import { goto } from '$app/navigation';
	import CreateSvg from '$lib/taps/components/CreateSVG.svelte';
	import JoinSVG from '$lib/taps/components/JoinSVG.svelte';
	import { websocket } from '$lib/taps/store/websocket';
	import { io } from 'socket.io-client';

	function establishConnection() {
		//https://tapsws.onrender.com
		websocket.set(io('https://tapsws.onrender.com'));
		if ($websocket !== null) {
			$websocket.on('roomJoined', () => {
				console.log('hello from on event');
			});

			$websocket.on('keydownEvent', () => {
				console.log('keydownEvent');
			});
		}
	}

	function createRoom() {
		establishConnection();
		const roomName = prompt('Input room name');

		if (roomName && $websocket !== null) {
			const eventData = { roomName };
			console.log('about to emit event', eventData);
			$websocket.emit('createRoom', eventData);

			goto(`/taps?room=${roomName}`);
		}
	}

	function joinRoom() {
		establishConnection();
		const roomName = prompt('Input room name');

		if (roomName && $websocket !== null) {
			const eventData = { roomName };
			$websocket?.emit('joinRoom', eventData);
			goto(`/taps?room=${roomName}`);
		}
	}
</script>

<main>
	<h1 class="text-[30vh] text-teal-100">Taps</h1>

	<form method="POST" class="inline-block" action="?/createRoom">
		<button
			type="button"
			class="bg-teal-400 border border-teal-100 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded text-[15vw]"
			on:click={createRoom}
		>
			<span style="display: inline-flex; align-items: center;"> <CreateSvg /> Create Room </span>
		</button>
	</form>

	<form method="POST" class="inline-block" action="?/joinRoom">
		<button
			type="button"
			class="bg-teal-400 border border-teal-100 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded text-[15vw]"
			on:click={joinRoom}
		>
			<span style="display: inline-flex; align-items: center;"> <JoinSVG /> Join Room </span>
		</button>
	</form>
</main>

<style>
	main {
		text-align: center;
		background-color: #2cced2;
		height: 100vh;
	}

	button {
		margin: 0 1em;
		padding: 0.5em 1em;
		font-size: 1em;
	}
</style>
