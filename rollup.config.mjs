import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const output = {
	banner: `/*
 * @license
 * docx-preview <https://github.com/VolodymyrBaydalka/docxjs>
 * Released under Apache License 2.0  <https://github.com/VolodymyrBaydalka/docxjs/blob/master/LICENSE>
 * Copyright Volodymyr Baydalka
 */`,
	sourcemap: true,
}

const umdOutput = {
	...output,
	name: "docx",
	file: 'dist/docx-preview.js',
	format: 'umd',
	globals: {
		jszip: 'JSZip'
	},
};

export default args => {
	const config = {
		input: 'src/docx-preview.ts',
		output: [umdOutput],
		plugins: [typescript()]
	}

	if (args.environment == 'BUILD:production')
		config.output = [umdOutput,
			{
				...umdOutput,
				file: 'dist/docx-preview.min.js',
				plugins: [terser({ecma: 2020, compress: {ecma: 2020}, mangle: true})]
			},
			{
				...output,
				file: 'dist/docx-preview.mjs',
				format: 'es',
			},
			{
				...output,
				file: 'dist/docx-preview.min.mjs',
				format: 'es',
				plugins: [terser({ecma: 2020, compress: {ecma: 2020}, mangle: true})]
			}];

	return config
};