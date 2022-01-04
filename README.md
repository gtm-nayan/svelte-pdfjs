## svelte-pdfjs

A wrapper around Mozilla's PDFJS renderer. Only cares about loading and showing the PDF and nothing else, all the fancy stuff such as styling the viewer is left up to the consumer. Still in early stages so feel free to create an issue or a PR for any bugs that you find, any improvements or feature requests.

## Usage

See [src/routes/index.svelte](src/routes/index.svelte)  
Demo: [Netlify](https://svelte-pdfjs.netlify.app)

## SvelteKit

It's compatible with SvelteKit, just import the component and use it. No onMount shenanigans required in the consumer since it's already done within the PDFViewer component.

## TODOs:

- [x] Text layer rendering
- [x] SvelteKit compatibility
- [ ] Think of a better name for the `zoomLevel` prop on `Page`
- [ ] SVG renderer
- [ ] Annotation layer
- [ ] Error handling
- [ ] Expose more stuff

## License

[MIT](LICENSE)
