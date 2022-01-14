<script lang="ts">
	import type { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';
	import TextLayer from './TextLayer.svelte';

	export let page: PDFPageProxy;
	export let viewport: PageViewport;
	export let renderTextLayer: boolean;

	let pageDiv: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	let renderTask: ReturnType<PDFPageProxy['render']>;

	async function renderPage() {
		canvas.width = viewport.width;
		canvas.height = viewport.height;
		pageDiv.style.width = `${canvas.width}px`;
		pageDiv.style.height = `${canvas.height}px`;

		const canvasContext = canvas.getContext('2d');

		renderTask?.cancel();
		renderTask = page.render({
			canvasContext,
			viewport,
		});
	}

	$: if (viewport) renderPage();
</script>

<div bind:this={pageDiv}>
	<canvas bind:this={canvas} />
	{#if renderTextLayer}
		<TextLayer {page} {viewport} />
	{/if}
</div>

<style>
	div {
		position: relative;
	}

	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
