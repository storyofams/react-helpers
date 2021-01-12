import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';

import pkg from './package.json';

const extensions = ['.tsx', '.ts'];

export default {
  input: ['./src/index.ts'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
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
