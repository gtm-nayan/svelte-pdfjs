export { default as Document } from './PDFViewer/Document.svelte';
export { default as Page } from './PDFViewer/Page.svelte';
export * from './utils/target_dimension.js';

import * as PDFJS from 'pdfjs-dist';
if (PDFJS.GlobalWorkerOptions) {
	PDFJS.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS.version}/build/pdf.worker.min.js`;
}
export { PDFJS };
