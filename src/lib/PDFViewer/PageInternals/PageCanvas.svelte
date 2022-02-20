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

	function set_dimesions(
		_div: typeof page_div,
		_canvas: typeof canvas,
		_viewport: typeof viewport
	) {
		_div.style.width = `${(_canvas.width = _viewport.width)}px`;
		_div.style.height = `${(_canvas.height = _viewport.height)}px`;
	}

	function render_page() {
		set_dimesions(page_div, canvas, viewport);

		render_task?.cancel();

		render_task = page.render({
			canvasContext: canvas.getContext('2d'),
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
