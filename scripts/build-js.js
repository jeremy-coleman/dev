const fs = require('fs')

options = {
  debug: false,
  detectGlobals: false,
  entries: ['./src/client/index.tsx'],
  extension: ['js', 'ts', 'tsx'],
  external: ['lodash', 'react', 'react-dom'],
  insertGlobalVars: false,
  bare: true
}

require('browserify')(options)
  .plugin('tsify', {
    typescript: require('typescript')
  })
  .transform('browserify-shim', {
    "lodash": "global:_",
    "react": "global:React",
    "react-dom": "global:ReactDOM"
  })
  .bundle()
  .on('error', error => console.error(error.toString()))
  .on('log', msg => console.info(msg))
  .pipe(fs.createWriteStream('./dist/client/bundle.js'))