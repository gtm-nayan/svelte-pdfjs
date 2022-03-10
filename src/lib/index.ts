export { default as Document, key } from './PDFViewer/Document.svelte';
export { default as Page } from './PDFViewer/Page.svelte';
export * from './utils/target_dimension.js';
export { PDFJS };

import * as PDFJS from 'pdfjs-dist';
if (PDFJS.GlobalWorkerOptions) {
	PDFJS.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS.version}/build/pdf.worker.min.js`;
}
