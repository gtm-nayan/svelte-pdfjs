import preprocess from 'svelte-preprocess';
import { default as adapter } from '@sveltejs/adapter-netlify';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'svelte-pdfjs': path.resolve('src/lib'),
				},
			},
		},
	},
};

export default config;
