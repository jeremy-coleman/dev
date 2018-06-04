var gulp = require('gulp')
const fs = require('fs')
//var transform = require("vinyl-transform");
//var source = require('vinyl-source-stream');
//var buffer = require('vinyl-buffer');
//var log = require('gulplog');
//var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence')
var ts = require('gulp-typescript')
var tscConfig = ts.createProject("tsconfig.json");



gulp.task("ts", () => {
  return tscConfig.src()
    .pipe(tscConfig()).js
    .pipe(gulp.dest('dist'));
});





gulp.task("vs", function () {
    return gulp.src(["node_modules/monaco-editor/min/vs/**/*"])
        .pipe(gulp.dest("dist/client/vs"))})





gulp.task('default', async () => gulp.series('tscompile'));