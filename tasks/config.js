var path = require('path')
var packageJson = require('../package.json');
var fs = require('fs')

let PATHS = {
  server: {
    src: 'src/server/main.ts',
    dest: 'dist/server/'
  },
  electron: {
    src: 'src/desktop/main.ts',
    dest: 'dist/desktop/'
  },
  client: {
    src: 'src/client/main.tsx',
    SRC_PUG_INDEX: 'src/client/index.pug',
    OUT_FILE: path.join('dist', 'client', 'app.js'),
    OUT_DIR: 'dist/client/',
    dest: 'dist/client/',
    SRC_STYLES: [
    './src/**/*.css',
    'src/**/*.scss',
    'src/**/*.sass',
    'src/**/*.styl',
    'src/**/*.less'
    ],
    DEST_STYLES: 'dist/client/styles.min.css'
  },
}
  

// let BABEL_HOT_CONFIG =
// {
//         extensions: ['.ts', '.tsx', '.js', '.jsx'],
//         plugins: [
//             ["@babel/plugin-syntax-typescript"],
//             ["@babel/plugin-syntax-decorators", {"legacy": true}],
//             ["@babel/plugin-syntax-jsx"],
//             ["module-resolver", {
//               "root": ["."],
//               "alias": {"@coglite": "./src/@coglite"} //"underscore": "lodash"
//             }],
//             "react-hot-loader/babel"
//         ],
//         sourceMaps: false
//   }
  

let POSTCSS_HOT_CONFIG =
{
    plugin: [
    'postcss-easy-import',
    'postcss-advanced-variables',
    ['postcss-custom-url', [
      ['inline', { maxSize: 10 }],
      ['copy', {
        assetOutFolder: path.resolve(__dirname, '..', PATHS.client.dest, 'assets'),
        baseUrl: 'assets',
        name: '[name].[hash]',
      }],
    ]
   ],
      
   ['postcss-preset-env', { browsers: 'last 2 Chrome versions' }],
     'postcss-inline-svg',
     'postcss-svgo',
    ['@fullhuman/postcss-purgecss', 
      {content: ['src/**/*.html', 'src/**/*.tsx', 'src/**/*.ts', 'src/**/*.js']}
   ],
   'postcss-discard-duplicates',
   ['postcss-csso', { restructure: false }]
  ],
  basedir: __dirname + '../src/client',
  inject: true
}




const PKG_DEPENDENCIES = Object.keys(packageJson.dependencies || {});
const PEER_DEPENDENCIES = Object.keys(packageJson.peerDependencies || {});
const DEV_DEPENDENCIES = Object.keys(packageJson.devDependencies || {});


const NODE_INTERNALS = ['assert', 'buffer', 'console', 'constants', 'crypto', 'domain', 'events', 'http', 'https', 'os', 'path', 'punycode', 'querystring', 'stream', 'string_decoder', 'timers', 'tty', 'url', 'util', 'vm', 'zlib'];

const ELECTRON_NODE_INTERNALS = NODE_INTERNALS.concat('electron');

const PROD_RUNTIME_DEPS = PKG_DEPENDENCIES.concat(PEER_DEPENDENCIES)

var DEPS = {
  PKG_DEPENDENCIES,
  PEER_DEPENDENCIES, 
  DEV_DEPENDENCIES,
  NODE_INTERNALS,
  ELECTRON_NODE_INTERNALS,
  PROD_RUNTIME_DEPS
}
//var excludeModules = ELECTRON_INTERNALS.concat(PKG_DEP_EXTERNALS);



 function getFileSize(filePath) {
  var size = fs.statSync(filePath).size;
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  //@ts-ignore
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}


 let BROWSERIFY_BASE_CONFIG =
{
  entries: [PATHS.client.src],
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  cache: {},
  packageCache: {},
  debug: false,
  sourceMaps: false,
  fullPaths: false
}


let CONFIG = {
  DEPS,
  getFileSize, 
  POSTCSS_HOT_CONFIG, 
 // BABEL_HOT_CONFIG, 
  BROWSERIFY_BASE_CONFIG, 
  PATHS
}

module.exports = CONFIG