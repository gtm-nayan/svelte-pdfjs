import type { PDFPageProxy } from 'pdfjs-dist';
import type { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';

export type MultipleOf90 = 0 | 90 | 180 | 270;

/**
 * A function that returns another function that returns a PageViewport with the given width.
 *
 * @param width - The width that you want the page to be.
 */
export function preferThisWidth(width: number) {
	return (page: PDFPageProxy, rotation: MultipleOf90 = 0): PageViewport => {
		const tmp_width = page.getViewport({ scale: 1, rotation }).width;
		return page.getViewport({ scale: width / tmp_width, rotation });
	};
}
/**
 * A function that returns another function that returns a PageViewport with the given height.
 *
 * @param height - The height that you want the page to be.
 */
export function preferThisHeight(height: number) {
	return (page: PDFPageProxy, rotation: MultipleOf90 = 0): PageViewport => {
		const tmp_height = page.getViewport({ scale: 1, rotation }).height;
		return page.getViewport({ scale: height / tmp_height, rotation });
	};
}
