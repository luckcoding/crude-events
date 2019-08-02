var babel = require('rollup-plugin-babel');
var peerDepsExternal = require('rollup-plugin-peer-deps-external');
var replace = require('rollup-plugin-replace');
var minify = require('rollup-plugin-babel-minify');
var pkg = require('./package.json');

var banner = '//  @crude/events v' + pkg.version + '\n'
  + '//  And @crude/events under the MIT license.\n';

function baseConfig() {
  return {
    input: 'src/index.js',
    plugins: [
      peerDepsExternal(),
      babel({
        babelrc: false,
        presets: [
          [
            '@babel/env',
            {
              loose: true,
              shippedProposals: true,
              modules: false,
              targets: {
                ie: 9
              }
            }
          ],
        ],
        exclude: 'node_modules/**'
      })
    ],
  }
}

function baseUmdConfig(minified) {
  var config = baseConfig();
  config.plugins.push(replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }));

  if (minified) {
    config.plugins.push(minify({ comments: false }));
  }

  return config;
}

const libConfig = baseConfig();
libConfig.output = [
  { sourcemap: true, name: 'Events', file: 'dist/events.cjs.js', format: 'cjs' },
  { sourcemap: true, name: 'Events', file: 'dist/events.es.js', format: 'es' },
];

const umdFullConfig = baseUmdConfig(false);
umdFullConfig.output = [
  { sourcemap: true, name: 'Events', file: 'dist/events.full.js', format: 'umd', banner: banner },
];

const umdFullConfigMin = baseUmdConfig(true);
umdFullConfigMin.output = [
  { sourcemap: true, name: 'Events', file: 'dist/events.full.min.js', format: 'umd' },
];

const umdConfig = baseUmdConfig(false);
umdConfig.output = [
  { sourcemap: true, name: 'Events', file: 'dist/events.js', format: 'umd', banner: banner },
];

const umdConfigMin = baseUmdConfig(true);
umdConfigMin.output = [
  { sourcemap: true, name: 'Events', file: 'dist/events.min.js', format: 'umd' },
];

module.exports = [
  libConfig,
  umdFullConfig,
  umdFullConfigMin,
  umdConfig,
  umdConfigMin,
];