var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    sass = require("gulp-sass");
    rimraf = require('rimraf')
    path = require('path')
    LOAD_PLUGIN = require('gulp-load-plugins')();
    sourcemaps = require('gulp-sourcemaps')  
var tsProject = ts.createProject("tsconfig.json");




var SOURCE_DIR = "src"
var DIST_DIR = "dist"
var ELECTRON_DIST = "dist/server/main.js"

gulp.task("build2", ["ts", "scss", "styles"])

gulp.task('build', function() {
    return gulp.start([
        'ts',
        'scss',
        'styles'
    ]);
});



gulp.task('scss', function () {
  return gulp.src([SOURCE_DIR + '/**/*.scss'])
    .pipe(LOAD_PLUGIN.sourcemaps.init())
    .pipe(LOAD_PLUGIN.sass())
    .pipe(LOAD_PLUGIN.sourcemaps.write('.'))
    .pipe(gulp.dest(DIST_DIR))
    ;
});

gulp.task("ts", () => {
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest(DIST_DIR));
});


gulp.task("styles", function () {
    return gulp.src(["src/**/*.ttf",
                    "src/**/*.svg",
                    "src/**/*.html",
                    "src/**/*.eot",
                    "src/**/*.woff",
                    "src/**/*.woff2",
                    "src/**/*.css",
                    "src/**/*.png"])
        .pipe(gulp.dest("dist"))})


gulp.task('clean', function (callback) {
  rimraf('./dist', callback);
});
