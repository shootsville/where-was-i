import dts from 'rollup-plugin-dts'
import { babel } from '@rollup/plugin-babel';
import ts from "rollup-plugin-ts";
import terser from '@rollup/plugin-terser';

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
  external: (id) => !/^[./]/.test(id)
})

export default [
  bundle({
    plugins: [
      ts(),
      terser(),
      babel({
        minified: true
      })],
    output: [
      {
        file: `lib/index.min.js`,
        format: 'esm',
        name: "WhereWasI",
        exports: "default"
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