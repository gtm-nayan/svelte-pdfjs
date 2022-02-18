<script lang="ts">
	import type { PDFPageProxy, RenderTask } from 'pdfjs-dist';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';
	import TextLayer from './TextLayer.svelte';

	export let page: PDFPageProxy;
	export let viewport: PageViewport;
	export let render_text_layer: boolean;

	let page_div: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	let render_task: RenderTask;

	async function render_page() {
		canvas.width = viewport.width;
		canvas.height = viewport.height;
		page_div.style.width = `${canvas.width}px`;
		page_div.style.height = `${canvas.height}px`;

		const canvasContext = canvas.getContext('2d');

		render_task?.cancel();
		render_task = page.render({
			canvasContext,
			viewport,
		});
	}

	$: if (viewport && canvas) render_page();
</script>

<div bind:this={page_div}>
	<canvas bind:this={canvas} />
	{#if render_text_layer}
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
