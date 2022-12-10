import { PDFWorker } from 'pdfjs-dist';
import { onDestroy, setContext } from 'svelte';

export function set_pdfjs_context() {
	if (!import.meta.env.SSR) {
		const worker = new PDFWorker({
			port: new Worker(
				new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url)
			) as unknown as null,
		});
		setContext('svelte_pdfjs_worker', worker);
		onDestroy(() => worker.destroy());
	}
}
