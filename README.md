## svelte-pdfjs
A crude implementation of a svelte pdf viewer component, reacts to changes in the URL, password, page number and zoom level. All styling is left upto the user.

## SSR
Partially SSR compatible. The internal library Pdf.js throws a warning when attempting SSR, can be fixed through vite-plugin-iso if being used in svelte kit.

## License
[MIT](LICENSE)