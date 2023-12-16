<script lang="ts">
	import { goto } from '$app/navigation';

	export let header: string;
	export let body: string;
	export let image: string;
	export let urlPath: string;

	function handleClick() {
		goto(`/${urlPath}`);
	}
</script>

<a href="/{urlPath}">
	<div
		class="max-w-sm rounded overflow-hidden shadow-lg transition hover:-translate-y-1 hover:scale-110 duration-500 hover:cursor-pointer m-3"
	>
		<img class="w-full" src={image} alt="Sunset in the mountains" />
		<div class="px-6 py-4">
			<div class="font-bold text-xl mb-2">{header}</div>
			<p class="text-gray-700 text-base">
				{body}
			</p>
		</div>
		<div class="px-6 pt-4 pb-2">
			<!-- <span
			class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
			>#photography</span
		>
		<span
			class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
			>#travel</span
		>
		<span
			class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
			>#winter</span
		> -->
		</div>
	</div>
</a>
