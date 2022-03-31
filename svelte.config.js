import preprocess from 'svelte-preprocess';
import { default as adapter } from '@sveltejs/adapter-static';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			precompress: true,
		}),
		vite: {
			resolve: {
				alias: {
					'svelte-pdfjs': path.resolve('src/lib'),
				},
			},
		},
		prerender: {
			default: true,
		},
		browser: {
			router: false,
		},
		paths: {
			base: process.env.BASE_PATH,
		},
	},
};

export default config;
