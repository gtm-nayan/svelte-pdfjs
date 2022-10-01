import preprocess from 'svelte-preprocess';
import { default as adapter } from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			precompress: true,
		}),

		alias: {
			'svelte-pdfjs': 'src/lib/index.js',
			'svelte-pdfjs/*': 'src/lib/*',
		},

		paths: {
			base: process.env.BASE_PATH,
		},
	},
};

export default config;
