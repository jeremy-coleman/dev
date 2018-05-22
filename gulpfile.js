var gulp = require('gulp')



gulp.task("copy:assets", async () => {
    return gulp.src(["src/**/*{.ttf, .css, .svg, .jpg, .html, .eot, .woff, .woff2, .png}"])
        .pipe(gulp.dest("dist"))})