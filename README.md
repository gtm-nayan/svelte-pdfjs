## svelte-pdfjs

A wrapper around Mozilla's PDFJS renderer. Only cares about loading and showing the PDF and nothing else, all the fancy stuff such as styling the viewer is left up to the consumer. Still in early stages so feel free to create an issue or a PR for any bugs that you find, any improvements or feature requests.

## Usage

See [src/routes/index.svelte](src/routes/index.svelte)  
[Demo](https://gtm-nayan.github.io/svelte-pdfjs)

## SvelteKit

It's compatible with SvelteKit, just import the component and use it in a `{#if browser}` you'll have to install pdfjs-dist as a dependency.

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
