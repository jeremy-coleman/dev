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
var typescript = require('gulp-typescript').createProject('tsconfig.json')
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
const babel = require('gulp-babel')

const runElectron = require('gulp-run-electron')

// Use UglifyES for ES6 support, The second argument is the logger
const minify = composer(uglify, console);

// CSS development transforms (autoprefixer)
gulp.task('postcss:dev', () => gulp
  .src('src/app/styles/main.css')
  .pipe(postcss([autoprefixer()]))
  .pipe(rename((path) => { path.basename = 'main'; }))
  .pipe(gulp.dest('dist/app/styles'))
);

// CSS production transforms (autoprefixer, cssnano, sourcemaps)
gulp.task('postcss:prod', () => gulp
  .src('src/app/styles/main.css')
  .pipe(postcss([autoprefixer()]))
  .pipe(rename((path) => { path.basename = 'main'; }))
  .pipe(sourcemaps.init())
  .pipe(cssnano({ discardComments: { removeAll: true } }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/app/styles'))
);

// JS development transforms (babel, react-hot-loader)
// Starts the dev server
gulp.task('browserify:dev', () => budo('src/app/index.tsx', {
  dir: 'dist/app',
  live: '**/**/main.css',
  stream: process.stdout,
  port: 8881,
  serve: 'app.js',
  open: false,
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
    presets: ['@babel/typescript','@babel/react', '@babel/env'],
    plugins: ['@babel/plugin-transform-modules-commonjs']
  })
  .transform({ global: true }, envify({ NODE_ENV: 'production' }))
  .transform({ global: true }, uglifyify)
  .plugin(collapser)
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(minify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/app'))
);

gulp.task('build:desktop', function () {
  return gulp.src('src/desktop/main.ts')
    .pipe(typescript())
    .pipe(gulp.dest('dist/desktop'))
})

gulp.task('start:desktop', function() {return gulp.src('dist').pipe(runElectron(['./dist/desktop/main.js']))})


gulp.task('clean', () => del(['dist']));

gulp.task("copy:assets", () =>
    gulp.src(["src/**/*.ttf",
                    "src/**/*.svg",
                    "src/**/*.html",
                    "src/**/*.eot",
                    "src/**/*.woff",
                    "src/**/*.woff2",
                    "src/**/*.png"])
        .pipe(gulp.dest("dist")))


gulp.task('start', gulp.series(
  'clean', 'copy:assets',
  'postcss:dev',
  gulp.task('build:desktop'),
  gulp.task('start:desktop'),
  gulp.parallel('browserify:dev', () => gulp.watch('src/app/css/main.css', gulp.task('postcss:dev'))),
  ));


gulp.task('build', gulp.series('clean', 'copy:assets', gulp.parallel('postcss:prod', 'browserify:prod')));
