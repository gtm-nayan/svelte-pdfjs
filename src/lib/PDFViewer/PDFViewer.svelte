<script lang="ts">
	import { onMount } from 'svelte';
	import type { OnProgressParameters } from 'pdfjs-dist/types/src/display/api';

	let Viewer;

	export let viewerType: 'canvas' | 'svg' = 'canvas';

	export let pdfUrl: string;
	export let zoomLevel: number;
	export let pageNumber: number;
	export let pdfPassword: string = undefined;
	export let progressCallback: (progress: OnProgressParameters) => void = undefined;

	onMount(async () => {
		if (viewerType == 'canvas') {
			Viewer = (await import('./CanvasImpl/PDFViewerCanvas.svelte')).default;
		}
	});
</script>

{#if Viewer}
	<svelte:component
		this={Viewer}
		{pdfUrl}
		{pdfPassword}
		{pageNumber}
		{zoomLevel}
		{progressCallback}
		on:documentloaded
	/>
{/if}
