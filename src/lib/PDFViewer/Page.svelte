<!-- @component
Render a page from the document. Must be a child of a `Document` component.
 -->
<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * What renderer implementation to use for the page.
	 * Defaults to canvas. SVG rendering not implemented yet.
	 */
	export let renderer: 'canvas' | 'svg' = 'canvas';

	/**
	 * The page number to show.
	 */
	export let pageNumber: number = 1;
	/**
	 * The scale to show the PDF at.
	 */
	export let zoomLevel: number = 1;
	/**
	 * Override the height to render the page at.
	 * If both `targetHeight` and `targetWidth` are provided, then targetWidth takes precedence.
	 */
	export let targetHeight: number = undefined;
	/**
	 * Override the width to render the page at.
	 * If both `targetHeight` and `targetWidth` are provided, then targetWidth takes precedence.
	 */
	export let targetWidth: number = undefined;
	/**
	 * Rotate the page by a multiple of 90 degrees.
	 */
	export let rotation: 0 | 90 | 180 | 270 = undefined;

	let InternalPageComponent;

	onMount(async () => {
		InternalPageComponent = (
			await (renderer === 'svg'
				? import('./PageInternals/PageSVG.svelte')
				: import('./PageInternals/PageCanvas.svelte'))
		).default;
	});
</script>

<svelte:component
	this={InternalPageComponent}
	{pageNumber}
	{zoomLevel}
	{targetHeight}
	{targetWidth}
	{rotation}
/>
