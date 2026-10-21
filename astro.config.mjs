// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()]
	},
	// Las tres familias se sirven desde src/assets/fonts: subsets latinos ya
	// recortados, sin duplicados .woff y sin subsets cirilicos/griegos que
	// nunca se descargan.
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Open Sans',
			cssVariable: '--font-open-sans',
			fallbacks: ['system-ui', 'sans-serif'],
			options: {
				variants: [
					{
						// Variable: ejes wght 300-800 y wdth 75-100.
						src: ['./src/assets/fonts/OpenSans-Variable.woff2'],
						weight: '300 800',
						style: 'normal',
						stretch: '75% 100%',
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Source Serif 4',
			cssVariable: '--font-source-serif',
			fallbacks: ['Georgia', 'serif'],
			options: {
				variants: [
					{
						// Variable: eje wght 200-900.
						src: ['./src/assets/fonts/SourceSerif4-Variable-latin.woff2'],
						weight: '200 900',
						style: 'normal',
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'IBM Plex Mono',
			cssVariable: '--font-plex-mono',
			fallbacks: ['ui-monospace', 'monospace'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/IBMPlexMono-400-latin.woff2'],
						weight: '400',
						style: 'normal',
					},
					{
						src: ['./src/assets/fonts/IBMPlexMono-500-latin.woff2'],
						weight: '500',
						style: 'normal',
					},
				],
			},
		},
	],
});
