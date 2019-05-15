import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import image from 'rollup-plugin-image';
import pkg from './package.json'

export default {
  input: 'src/index.ts',
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
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    typescript({
      typescript: require('typescript'),
    }),
    image(),
    sass({ insert: true }),
  ],
}