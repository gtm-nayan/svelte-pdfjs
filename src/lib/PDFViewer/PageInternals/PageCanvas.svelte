<script lang="ts">
	import type { PDFPageProxy, RenderTask } from 'pdfjs-dist';
	import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';
	import TextLayer from './TextLayer.svelte';

	export let page: PDFPageProxy;
	export let viewport: PageViewport;
	export let render_text_layer: boolean;

	let canvas: HTMLCanvasElement;

	let render_task: RenderTask;

	function render_page() {
		render_task?.cancel();
		render_task = page.render({
			canvasContext: canvas.getContext('2d'),
			viewport,
		});
	}

	$: if (viewport && canvas) render_page();
</script>

<div style:--spw={viewport?.width} style:--sph={viewport?.height}>
	<canvas bind:this={canvas} width={viewport?.width} height={viewport?.height} />
	{#if render_text_layer}
		<TextLayer {page} {viewport} />
	{/if}
</div>

<style>
	div {
		position: relative;
		height: calc(var(--sph) * 1px);
		width: calc(var(--spw) * 1px);
	}

	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
