import dts from 'rollup-plugin-dts'
import { babel } from '@rollup/plugin-babel';
import ts from "rollup-plugin-ts";
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const bundle = (config) => ({
  ...config,
  input: './src/index.ts',
  external: (id) => !/^[./]/.test(id)
})

export default [
  bundle({
    plugins: [
      ts(),
      terser(),
      resolve(),
      babel({ babelHelpers: "bundled", minified: true }),
    ],
    output: [
      {
        file: `lib/index.min.js`,
        format: 'esm',
        name: "WhereWasI",
        exports: "default"
      },
    ],
  }),
  bundle({
    plugins: [
      ts(),
      resolve({}),
      terser(),
      babel({
        babelHelpers: "bundled",
        minified: true,
        babelrc: true
      }),
    ],
    output: [
      {
        file: `lib/index.iife.min.js`,
        format: 'iife',
        name: "WhereWasI",
        exports: "default",
        globals: {
          html2canvas: "html2canvas"
        }
      }
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `lib/index.d.ts`
    },
  }),
]