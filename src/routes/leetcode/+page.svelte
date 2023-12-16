<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	async function loadQuestion() {
		const response = await fetch('https://leetcode.com/graphql/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				cookie: `csrftoken={""}; LEETCODE_SESSION={""}`,
				'x-csrftoken': ''
			},
			body: JSON.stringify({
				query: `
				query randomQuestion($categorySlug: String, $filters: QuestionListFilterInput) {randomQuestion(categorySlug: $categorySlug, filters: $filters) {titleSlug}}`,
				variables: {
					categorySlug: 'all-code-essentials',
					filters: {}
				}
			})
		});

		const data = await response.json();

		console.log(data);
	}

	onMount(() => loadQuestion());
</script>

<div>HELLOOO</div>
