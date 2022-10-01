import { PDFWorker } from 'pdfjs-dist';
import PDFWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
import { onDestroy, setContext } from 'svelte';

export function set_pdfjs_context() {
	if (!import.meta.env.SSR) {
		const worker = new PDFWorker({ port: new Worker(PDFWorkerSrc) as unknown as null });
		setContext('svelte_pdfjs_worker', worker);
		onDestroy(() => worker.destroy());
	}
}
