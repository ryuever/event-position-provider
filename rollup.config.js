import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'index.js',
  output: {
    file: 'lib/EventPositionProvider.js',
    format: 'umd',
    name: 'EventPositionProvider',
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      babelrc: false,
      "presets": [
        ["env", {
          "modules": false
        }]
      ],
      "plugins": ["external-helpers", "transform-object-rest-spread"],
      exclude: 'node_modules/**'
    })
  ]
};
