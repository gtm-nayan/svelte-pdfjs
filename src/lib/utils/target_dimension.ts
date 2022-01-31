import type { PDFPageProxy } from 'pdfjs-dist';
import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';

export type MultipleOf90 = 0 | 90 | 180 | 270;

export function preferThisWidth(width: number) {
	return (page: PDFPageProxy, rotation: MultipleOf90 = 0): PageViewport => {
		const tmp_width = page.getViewport({ scale: 1, rotation }).width;
		return page.getViewport({ scale: width / tmp_width, rotation });
	};
}

export function preferThisHeight(height: number) {
	return (page: PDFPageProxy, rotation: MultipleOf90 = 0): PageViewport => {
		const tmp_height = page.getViewport({ scale: 1, rotation }).height;
		return page.getViewport({ scale: height / tmp_height, rotation });
	};
}
