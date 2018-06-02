var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    sass = require("gulp-sass");
    rimraf = require('rimraf')
    merge = require('merge2');
    path = require('path')
    LOAD_PLUGIN = require('gulp-load-plugins')();
    
var tsProject = ts.createProject("tsconfig.json");

const electronConnect = require("electron-connect");

const electron = electronConnect.server.create({
    path: path.join(process.cwd(), 'dist/main', 'main.js'),
    stopOnClose: true,
     useGlobalElectron: false
});







var DIST_DIR = "dist"

gulp.task("watch", function () {
  electron.start();
  gulp.watch(["src/**/*.ts"], ["ts"]);
  gulp.watch(["styles/**/*.scss"], ["sass"]);
  gulp.watch(["src/**/*.css"], electron.reload);
  gulp.watch(["src/**/*.html"], electron.reload);
  gulp.watch(["dist/**/*.js"], electron.restart);
  gulp.watch(["dist/**/*.css"], electron.restart);
});

gulp.task('serve:dist', ['build'], function () {
  electronServer.create({path: DIST_DIR}).start();
});

gulp.task("build", ["ts", "sass:inline",  "css", "fonts:inline", "svg:inline", "licenses:inline", "html"])

gulp.task("static", [ "sass:static", "css:static","html"]);

gulp.task('compile:styles', function () {
  return gulp.src([srcDir + '/styles/**/*.scss'])
    .pipe(LOAD_PLUGIN.sourcemaps.init())
    .pipe(LOAD_PLUGIN.sass())
    .pipe(LOAD_PLUGIN.sourcemaps.write('.'))
    .pipe(gulp.dest(serveDir + '/styles'))
    ;
});




gulp.task("sass:static", function () {
    return gulp.src(["static/styles/**/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("dist/coglite/app/styles"));});
    
    gulp.task("css:static", function () {
    return gulp.src(["static/styles/**/*.css"])
        .pipe(gulp.dest("dist/coglite/app/styles"))})
    
gulp.task("sass:inline", function () {
    return gulp.src(["src/**/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("dist"));});


gulp.task("css", function () {
    return gulp.src(["src/**/*.css"])
        .pipe(gulp.dest("dist"))})

gulp.task("fonts:inline", function () {
    return gulp.src(["src/**/*.ttf"])
        .pipe(gulp.dest("dist"))})

gulp.task("svg:inline", function () {
    return gulp.src(["src/**/*.svg"])
        .pipe(gulp.dest("dist"))})

gulp.task("licenses:inline", function () {
    return gulp.src(["src/**/LICENSE.txt"])
        .pipe(gulp.dest("dist"))})


gulp.task("ts", () => {
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest(tsProject.config.compilerOptions.outDir));
});

gulp.task("html", function () {
    return gulp.src(["src/**/*.html"])
        .pipe(gulp.dest("dist"))})

gulp.task('clean', function (callback) {
  rimraf('./dist', callback);
});


gulp.task('vendor', function () {
  var streams = [], dependencies = [];
  var defaultModules = ['assert', 'buffer', 'console', 'constants', 'crypto', 'domain', 'events', 'http', 'https', 'os', 'path', 'punycode', 'querystring', 'stream', 'string_decoder', 'timers', 'tty', 'url', 'util', 'vm', 'zlib'],
      electronModules = ['electron'];

  // Because Electron's node integration, bundle files don't need to include browser-specific shim.
  var excludeModules = defaultModules.concat(electronModules);

  for(var name in packageJson.dependencies) {
    dependencies.push(name);
  }

  // create a list of dependencies' main files
  var modules = dependencies.map(function (dep) {
    var packageJson = require(dep + '/package.json');
    var main;
    if(!packageJson.main) {
      main = ['index.js'];
    }else if(Array.isArray(packageJson.main)){
      main = packageJson.main;
    }else{
      main = [packageJson.main];
    }
    return {name: dep, main: main.map(function (it) {return path.basename(it);})};
  });

  // add babel/polyfill module
 // modules.push({name: 'babel', main: ['polyfill.js']});

  // create bundle file and minify for each main files
  modules.forEach(function (it) {
    it.main.forEach(function (entry) {
      var b = browserify('node_modules/' + it.name + '/' + entry, {
        detectGlobal: false,
        standalone: entry
      });
      excludeModules.forEach(function (moduleName) {b.exclude(moduleName)});
      streams.push(b.bundle()
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(LOAD_PLUGIN.uglify())
        .pipe(gulp.dest(DIST_DIR + '/node_modules/' + it.name))
      );
    });
    streams.push(
      // copy modules' package.json
      gulp.src('node_modules/' + it.name + '/package.json')
        .pipe(gulp.dest(DIST_DIR + '/node_modules/' + it.name))
    );
  });

  return merge(streams);
});