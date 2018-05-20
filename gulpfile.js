// Gulp
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');

// CSS
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('gulp-cssnano');


// JS
const browserify = require('browserify');
const babelify = require('babelify');
const tsify = require('tsify');
const envify = require('envify/custom');
const uglifyify = require('uglifyify');
const collapser = require('bundle-collapser/plugin');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const composer = require('gulp-uglify/composer');
const uglify = require('uglify-es');
const budo = require('budo');
const livereactload = require('livereactload');

// Use UglifyES for ES6 support
// The second argument is the logger
const minify = composer(uglify, console);

// CSS development transforms (autoprefixer)
gulp.task('postcss:dev', () => gulp
  .src('src/css/main.css')
  .pipe(postcss([autoprefixer()]))
  .pipe(rename((path) => { path.basename = 'main'; }))
  .pipe(gulp.dest('build/css'))
);

// CSS production transforms (autoprefixer, cssnano, sourcemaps)
gulp.task('postcss:prod', () => gulp
  .src('src/css/main.css')
  .pipe(postcss([autoprefixer()]))
  .pipe(rename((path) => { path.basename = 'main'; }))
  .pipe(sourcemaps.init())
  .pipe(cssnano({ discardComments: { removeAll: true } }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('build/css'))
);

// JS development transforms (babel, react-hot-loader)
// Starts the dev server
gulp.task('browserify:dev', () => budo('src/index.tsx', {
  dir: 'build',
  live: '**/**/main.css',
  stream: process.stdout,
  port: 8080,
  serve: 'js/main.js',
  open: true,
  browserify: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugin: [livereactload],
    transform: babelify.configure({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      presets: ['@babel/typescript','@babel/react', '@babel/env'],
      plugins: ['react-hot-loader/babel', '@babel/plugin-transform-modules-commonjs'],
      sourceMaps: false
    }),
    sourceMaps: false
  }
}));



// JS production transforms (babel, envify, uglifyify, bundle collapser, uglify, sourcemaps)
gulp.task('browserify:prod', () => browserify({ entries: 'src/index.jsx', debug: true })
  .transform(babelify, {
    presets: ['@babel/preset-react'],
    plugins: ['@babel/plugin-transform-modules-commonjs']
  })
  .transform({ global: true }, envify({ NODE_ENV: 'production' }))
  .transform({ global: true }, uglifyify)
  .plugin(collapser)
  .bundle()
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(minify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('build/js'))
);

// Clean the build folder
gulp.task('clean', () => del(['build']));

// Copy the public folder to the build folder
gulp.task('copy', () => gulp
  .src(['./src/public/**'])
  .pipe(gulp.dest('build'))
);

// Clean the build folder, copy static assets, and compile CSS
// Run budo (JS) and gulp-watch (CSS) in parallel
gulp.task('start', gulp.series('clean', 'copy', 'postcss:dev', gulp.parallel('browserify:dev', () => gulp
  .watch('src/css/main.css', gulp.task('postcss:dev'))
)));

// Clean the build folder and copy static assets
// Compile JS and CSS in parallel
gulp.task('build', gulp.series('clean', 'copy', gulp.parallel('postcss:prod', 'browserify:prod')));
