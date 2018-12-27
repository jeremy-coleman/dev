
var gulp = require('gulp')
var vinylServe = require('vinyl-serve')
var ts = require('gulp-typescript')

gulp.task('serve-ts', function() {
      return gulp.src('src/**/*.{ts,tsx}')
        .pipe(ts({
            isolatedModules : true,
            outFile: 'output.js'
        }))
        .pipe(gulp.dest('built/local'))
        .pipe(vinylServe(7000))
})


gulp.task('serve-html', function () {
  return gulp.src('src/**/*.html')
    .pipe(vinylServe(7000))
})

gulp.task('watch', async () => {
  gulp.watch(PATHS.client.SRC_PUG_INDEX, gulp.series('pug'))
  gulp.watch(PATHS.client.SRC_STYLES, gulp.series('app:postcss'))
})


gulp.task('serve', gulp.parallel('serve-ts', 'serve-html'))