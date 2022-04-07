<script lang="ts">
	import type { PDFPageProxy, RenderTask } from 'pdfjs-dist';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';
	import { afterUpdate } from 'svelte';
	import TextLayer from './TextLayer.svelte';

	export let page: PDFPageProxy;
	export let viewport: PageViewport;
	export let render_text_layer: boolean;

	let canvas: HTMLCanvasElement;

	let render_task: RenderTask;

	function render_page() {
		if (render_task?._internalRenderTask.running) render_task.cancel();
		render_task = page.render({
			canvasContext: canvas.getContext('2d'),
			viewport,
		});
	}

	$: if (viewport && canvas) afterUpdate(render_page);
</script>

<div>
	<canvas
		bind:this={canvas}
		width={viewport?.width}
		height={viewport?.height}
	/>{#if render_text_layer}
		<TextLayer {page} {viewport} />
	{/if}
</div>

<style>
	div {
		position: relative;
		padding: 0;
	}

	canvas {
		display: block;
		margin: 0;
	}
</style>
