var gulp = require('gulp')
const fs = require('fs')
var transform = require("vinyl-transform");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var log = require('gulplog');
var sourcemaps = require('gulp-sourcemaps');
var tsify = require('tsify')
var browserify = require('browserify')
var runSequence = require('run-sequence')
var ts = require('gulp-typescript')
var tsServerProject = ts.createProject("tsconfig.server.json");
var bsShim = require('browserify-shim')


gulp.task("ts.server", () => {
  return tsServerProject.src()
    .pipe(tsServerProject())
    .js
    .pipe(gulp.dest(tsServerProject.config.compilerOptions.outDir));
});



gulp.task("vs", function () {
    return gulp.src(["node_modules/monaco-editor/min/vs/**/*"])
        .pipe(gulp.dest("dist/client/vs"))})

gulp.task("favicon", function () {
    return gulp.src(["src/client/favicon.png"])
        .pipe(gulp.dest("dist/client"))})

gulp.task("html", function () {
    return gulp.src(["src/client/index.html"])
        .pipe(gulp.dest("dist/client"))})



gulp.task('bs', function () {
  var b = browserify({
    entries: 'src/client/index.tsx',
    debug: true,
    plugin: [tsify],
    external: ['lodash', 'react', 'react-dom'],
  })
  .transform('browserify-shim', {
  "lodash": "global:_",
  "react": "global:React",
  "react-dom": "global:ReactDOM"
});
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    //.pipe(uglify())
    .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/client/'));
});

gulp.task('default', (done) =>
  runSequence('vs',
              'favicon',
              'html',
              'bs',
              done));

