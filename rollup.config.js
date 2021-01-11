import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';

import pkg from './package.json';

const extensions = ['.jsx', '.ts'];

export default {
  input: ['./src/index.ts'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    typescript({
      typescript: ttypescript,
    }),
    babel({
      extensions,
      babelHelpers: 'runtime',
      include: ['src/**/*'],
      exclude: ['node_modules/**'],
    }),
  ],
};
