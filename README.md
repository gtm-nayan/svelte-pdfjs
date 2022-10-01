## svelte-pdfjs

A wrapper around Mozilla's PDFJS renderer. Only cares about loading and showing the PDF and nothing else, all the fancy stuff such as styling the viewer is left up to the consumer. Still in early stages so feel free to create an issue or a PR for any bugs that you find, any improvements or feature requests.

## Usage

You'll have to install `pdfjs-dist` and provide a worker to the `Document` component through svelte's context. For vite/sveltekit users a convenience function is exported through [svelte-pdfjs/utils/vite](src/lib/utils/vite.ts) which takes care of browser checks, resolving the url to the worker, setting the context and cleaning up when the component is destroyed.

See [src/routes/+page.svelte](src/routes/+page.svelte) and [src/routes/+layout.svelte](src/routes/+layout.svelte)
[Demo](https://gtm-nayan.github.io/svelte-pdfjs)

## Treeshaking

Because of how pdfjs-dist is bundled with webpack, automatic treeshaking isn't possible like it is with ES modules. You can manually patch your installation of `pdfjs-dist` to ignore unused parts and reduce your bundle size if you so wish. [Example](patches/pdfjs-dist%402.16.105.patch)

## SSR

For now this package cannot be used with SSR, contributions to improve in that area are more than welcome. Because of how pdfjs-dist is packaged, there is an eval which prevents bundlers from properly minifying whatever chunk it ends up in. To get around it, you can patch your installation of pdfjs-dist such that all instances of `_is_node.isNodeJs` are replaced with `false` since those parts aren't going to be used anyway.

## TODOs:

- [x] Text layer rendering
- [x] SvelteKit compatibility
- [ ] SVG renderer
- [ ] Annotation layer
- [ ] Error handling
- [ ] Expose more stuff

## License

[MIT](LICENSE)
