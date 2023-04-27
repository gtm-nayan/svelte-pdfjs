<!-- @component
Render a page from a PDF document. Must be a child of a `Document` component.
 -->
<svelte:options immutable />

<!--
	@todo Immutable could be a bad idea since it would not update 
	for getViewport functions that are defined inline
	when their dependencies change.
 -->
<script context="module" lang="ts">
	import '@gtmnayan/pdfjs-dist-esm/web/pdf_viewer.css';

	import type { PDFDocumentProxy } from '@gtmnayan/pdfjs-dist-esm';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	import type { PDFSinglePageViewer } from '@gtmnayan/pdfjs-dist-esm/web/pdf_single_page_viewer.js';
	import { EventBus } from '@gtmnayan/pdfjs-dist-esm/web/event_utils.js';
	import { browser } from '$app/environment';
</script>

<script lang="ts">
	const current_doc: Writable<PDFDocumentProxy> = getContext('svelte_pdfjs_doc');

	let PDFSinglePageViewer: typeof import('@gtmnayan/pdfjs-dist-esm/web/pdf_single_page_viewer.js');

	let container_el: HTMLDivElement;
	let viewer: PDFSinglePageViewer;

	let eventBus: EventBus;

	export let num: number;
	export let scale = 1;
	export let container_styles: string;
	export let render_text_layer = false;

	onMount(() => {
		(async () => {
			eventBus = new EventBus();
			({ PDFSinglePageViewer } = await import(
				'@gtmnayan/pdfjs-dist-esm/web/pdf_single_page_viewer.js'
			));
			viewer = new PDFSinglePageViewer({
				container: container_el,
				eventBus,
			});
		})();

		return () => {
			viewer?.cleanup();
			eventBus?.reset();
		};
	});

	$: browser && viewer && viewer.setDocument($current_doc);
	$: browser && viewer && Reflect.set(viewer, 'currentPageNumber', num);
	$: browser && viewer && Reflect.set(viewer, 'currentScale', scale);
</script>

<div class="container" bind:this={container_el} style={container_styles}>
	<div class="viewer">
		<canvas />
	</div>
</div>

<style>
	.container {
		position: absolute;
	}
</style>
