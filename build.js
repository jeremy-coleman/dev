var spawn = require('child_process').spawn
var fs = require('fs')
var path = require('path')
var browserify = require('browserify')
//var livereload = require('browserify-livereload')
var watchify = require('watchify')
var tsify = require('tsify')
var babelify = require('babelify')
var _ = require('lodash')
var ts = require('typescript')
var tinyify = require('tinyify')
var jetpack = require('fs-jetpack')
var ts = require('typescript')
var electron = require('electron')
const livereactload = require('livereactload');
//var hmr = require('browserify-hmr')

function compile(fileNames, options) {
    let program = ts.createProgram(fileNames, options);
    program.emit();
}

compile(['src/desktop/main.ts'], {
    noEmitOnError: true, 
    noImplicitAny: true,
    target: ts.ScriptTarget.ESNext, 
    module: ts.ModuleKind.CommonJS,
    outDir: 'dist/desktop'
});


function copyAppDir() {jetpack.copy('src', 'dist', {
  overwrite: true,
  matching: ['*.html', '*.css', "*.ico", "*.svg"]
 });
}

copyAppDir()


const outfile = path.join('dist', 'app', 'app.js')

const b = watchify(browserify({
  entries: 'src/app/app.tsx',
  //standalone: 'coglite',
  cache: {},
  packageCache: {},
  debug: false,
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  //plugin: [livereactload],
  transform: babelify.configure({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        presets: ['@babel/typescript','@babel/react', '@babel/env'],
        plugins: ['react-hot-loader/babel', '@babel/plugin-transform-modules-commonjs'],
        sourceMaps: false
  }),
  sourceMaps: false
                


  //plugin: [tsify, watchify, tinyify]
}))

//b.plugin(hmr, {mode: 'ajax', url: outfile})
b.plugin(livereactload, {host: 'localhost',port: 1337, outfile,})

//b.plugin(livereactload, {host: 'localhost'})
b.on('error', console.log)
b.on('syntax', console.log)


function launch() {
  console.log('launching electron')
  const child = spawn(electron, ['dist/desktop/main.js'], {detached: false, stdio: 'inherit'})
  child.on('close', () => {
    console.log('electron is done')
    process.exit(0)
  })
}

launch = _.once(launch)


b.on('update', bundle)

function bundle() {
  b.bundle()
    .on('error',console.error)
    .pipe(fs.createWriteStream(outfile))
    .on('close',launch)
  console.log(`wrote ${outfile}`)
}


bundle()

