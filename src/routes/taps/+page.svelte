<script lang="ts">
	import { websocket } from '$lib/taps/store/websocket';

	let playerCount = 100;
	let opponentCount = 100;

	let canHighlight: boolean = false;
	let canHighlightOpp: boolean = false;
	$websocket?.on('keydownEvent', () => {
		canHighlightOpp = true;
	});
	$websocket?.on('keyupEvent', () => {
		canHighlightOpp = false;
		opponentCount--;
	});

	function keydownHandler(event: KeyboardEvent) {
		if (event.key === ' ') {
			$websocket?.emit('keydown', 'hello');
			canHighlight = true;
		}
	}
	function keyupHandler(event: KeyboardEvent) {
		if (event.key === ' ') {
			$websocket?.emit('keyup', 'hello');
			canHighlight = false;
			playerCount--;
		}
	}
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
