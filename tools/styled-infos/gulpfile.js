var gulp = require('gulp')
var typescript = require('gulp-typescript').createProject('tsconfig.json')
var del = require('del');
var sass = require('gulp-sass')
var cp = require('child_process')

var assetPaths = ["src/**/*{.ttf,.css,.svg,.jpg,.html,.eot,.woff,.woff2,.png}"]
var tsPaths = ['src/**/*{.ts,.tsx,.js,.jsx}']

gulp.task('clean:dist', function () {return del(['dist/'])})

gulp.task('tsc', async () => {
  return gulp.src(['src/**/*{.ts,.tsx,.js,.jsx}'])
    .pipe(typescript())
    .pipe(gulp.dest('dist'))
})

gulp.task("copy:assets",  async () => {
   return gulp.src(["src/**/*{.ttf,.css,.svg,.jpg,.html,.eot,.woff,.woff2,.png}"])
        .pipe(gulp.dest("dist"))
})

gulp.task('build', gulp.parallel('tsc', 'copy:assets'))