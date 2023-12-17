<script lang="ts">
	import { websocket } from '$lib/taps/store/websocket';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { io } from 'socket.io-client';
	import { goto } from '$app/navigation';

	let playerCount = 100;
	let opponentCount = 100;

	let canHighlight: boolean = false;
	let canHighlightOpp: boolean = false;

	function keydownHandler(event: KeyboardEvent) {
		if (event.key === ' ') {
			$websocket?.emit('keydown', $page.data.room);
			canHighlight = true;
		}
	}

	function keyupHandler(event: KeyboardEvent) {
		if (event.key === ' ') {
			$websocket?.emit('keyup', $page.data.room);
			canHighlight = false;
			playerCount--;
		}
	}

	$: {
		if (playerCount === 0) {
			alert('YOU WIN!');
		}
		if (opponentCount === 0) {
			alert('YOU LOSE!');
		}
	}

	onMount(() => {
		//https://tapsws.onrender.com
		websocket.set(io('https://tapsws.onrender.com'));
		if ($websocket !== null) {
			$websocket.on('roomDNE', () => {
				goto('/taps/room');
			});

			$websocket.on('roomAE', () => {
				goto('/taps/room');
			});
			$websocket?.on('keydownEvent', () => {
				canHighlightOpp = true;
			});

			$websocket?.on('keyupEvent', () => {
				canHighlightOpp = false;
				opponentCount--;
			});

			$websocket?.on('opponentDisconnected', () => {
				alert('opponent disconnected');
				playerCount = 100;
				opponentCount = 100;
			});
		}

		if ($page.data.create) {
			$websocket?.emit('createRoom', { roomName: $page.data.room });
		} else {
			console.log('joining room');
			$websocket?.emit('joinRoom', { roomName: $page.data.room });
		}
	});

	onDestroy(() => {
		$websocket?.disconnect();
		$websocket = null;
		$websocket = $websocket;
	});
</script>

<svelte:window on:keydown={keydownHandler} on:keyup={keyupHandler} />

<div class="flex flex-row items-center justify-center h-screen gap-x-[10vw] background">
	<div class="text-teal-100 text-center">
		<div>
			<span class="text-teal-100 text-[15vw]">
				{playerCount}
			</span>
		</div>
		<div>
			<span
				class="text-teal-100 border-solid border-4 rounded-lg px-[15vw] py-[5vh]"
				class:highlight={canHighlight}
			>
				Spacebar
			</span>
		</div>
	</div>

	<div class="text-teal-100 text-center">
		<div>
			<span class="text-teal-100 text-[15vw]">
				{opponentCount}
			</span>
		</div>
		<div>
			<span
				class="text-teal-100 border-solid border-4 rounded-lg px-[15vw] py-[5vh]"
				class:highlight={canHighlightOpp}
			>
				Spacebar
			</span>
		</div>
	</div>
</div>

<style>
	.background {
		background-color: #2cced2;
		height: 100vh;
		width: 100vw;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.highlight {
		background-color: white;
	}
</style>
