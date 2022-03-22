export { default as Document, key } from './PDFViewer/Document.svelte';
export { default as Page } from './PDFViewer/Page.svelte';
export * from './utils/target_dimension.js';
export { PDFJS };

// https://vitejs.dev/guide/assets.html#explicit-url-imports
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
import * as PDFJS from 'pdfjs-dist';
if (PDFJS.GlobalWorkerOptions) {
	PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
}
