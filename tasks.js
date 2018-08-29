const { src, task, exec, context, tsc, bumpVersion, npmPublish } = require("fuse-box/sparky");
const jetpack = require('fs-jetpack')
var cp = require('child_process')


task('clean', async () => await src("./dist").clean("dist/").exec());

task('copy:tests', async () => await src("./src/**/*.test.*").dest("tests/").exec());

task('clean:temp', () => cp.exec('rimraf temp/**/*.js'));

task('clean:tests', () => cp.exec('rimraf src/@coglite/framework/**/*.test.ts'));


function copyAppDir() {
  jetpack.copy('src', 'dist', {
      overwrite: true,
      matching: ['*.html', "*.ico","*.svg"]
     }
  );
}

task('copy:jetpack:example', () => copyAppDir());