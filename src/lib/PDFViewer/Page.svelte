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
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	import type {
		EventBus,
		PDFSinglePageViewer,
	} from '@gtmnayan/pdfjs-dist-esm/web/pdf_viewer.component.js';
	import { browser } from '$app/environment';
</script>

<script lang="ts">
	const current_doc: Writable<PDFDocumentProxy> = getContext('svelte_pdfjs_doc');

	let container_el: HTMLDivElement;
	let viewer: PDFSinglePageViewer;

	export let eventBus: EventBus;

	export let num: number;
	export let scale = 1;
	export let container_styles: string;
	export let render_text_layer = false;

	async function create_viewer() {
		const { EventBus, PDFSinglePageViewer } = await import(
			'@gtmnayan/pdfjs-dist-esm/web/pdf_viewer.component.js'
		);
		eventBus = new EventBus();

		// @ts-expect-error
		viewer = new PDFSinglePageViewer({
			container: container_el,
			eventBus,
		});
	}
	onMount(create_viewer);

	onDestroy(() => {
		viewer?.cleanup();
		// @ts-expect-error
		viewer = null;
		// @ts-expect-error
		eventBus = null;
	});

	$: browser && viewer && viewer.setDocument($current_doc);
	$: browser && viewer && Reflect.set(viewer, 'currentPageNumber', num);
	$: browser && viewer && Reflect.set(viewer, 'currentScaleValue', scale);
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
