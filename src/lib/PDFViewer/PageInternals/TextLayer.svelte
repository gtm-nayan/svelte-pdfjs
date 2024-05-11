<script lang="ts">
	import { BROWSER } from 'esm-env';
	import type { PageViewport, PDFPageProxy, TextLayerRenderTask } from 'pdfjs-dist';

	export let page: PDFPageProxy;
	export let viewport: PageViewport;

	let render_task: TextLayerRenderTask;
	let container: HTMLDivElement;

	async function render_text_layer() {
		render_task?.cancel();
		while (container.firstChild) container.firstChild.remove();
		const { renderTextLayer } = await import('pdfjs-dist');
		render_task = renderTextLayer({
			container,
			textContentSource: page.streamTextContent(),
			viewport,
		});
	}

	$: if (BROWSER && container && viewport) render_text_layer();
</script>

<div bind:this={container} />

<style>
	div {
		position: absolute;
		inset: 0;
		overflow: clip;
		opacity: 0.2;
		line-height: 1;
	}

	div > :global(span) {
		color: transparent;
		position: absolute;
		white-space: pre;
		cursor: text;
		transform-origin: 0% 0%;
	}
</style>
