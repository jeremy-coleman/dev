var gulp = require('gulp')

gulp.task("cpionic", function () {
    return gulp.src(["node_modules/@ionic/core/dist/ionic/**/*"])
        .pipe(gulp.dest("dist/public/ionic"))})

