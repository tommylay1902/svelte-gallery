<script lang="ts">
	import { goto } from '$app/navigation';
	import CreateSvg from '$lib/taps/components/CreateSVG.svelte';
	import JoinSVG from '$lib/taps/components/JoinSVG.svelte';

	function createRoom() {
		const roomName = prompt('Input room name');

		if (roomName) {
			// $websocket.emit('createRoom', eventData);

			goto(`/taps?room=${roomName}&create=true`);
		}
	}

	function joinRoom() {
		const roomName = prompt('Input room name');

		if (roomName) {
			// $websocket?.emit('joinRoom', eventData);
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
