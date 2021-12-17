<script lang="ts">
	import { onMount } from 'svelte';

	export let pageType: 'canvas' | 'svg' = 'canvas';

	export let pageNumber: number = 1;
	export let zoomLevel: number = 1;
	export let desiredHeight: number = undefined;
	export let desiredWidth: number = undefined;

	let InternalPageComponent;

	onMount(async () => {
		InternalPageComponent = (
			await (pageType === 'svg'
				? import('./PageInternals/PageSVG.svelte')
				: import('./PageInternals/PageCanvas.svelte'))
		).default;
	});
</script>

<svelte:component
	this={InternalPageComponent}
	{pageNumber}
	{zoomLevel}
	{desiredHeight}
	{desiredWidth}
/>
