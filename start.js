
var path = require('path')
var webpack = require('webpack')

var fastify = require('fastify')();
const [app_config, desktop_config] = require('./webpack.dev');


const compiler = webpack(app_config);

fastify.use(require('webpack-dev-middleware')(compiler, {
    publicPath: app_config.output.publicPath,
    hot: true,
    stats: 'minimal'
}));

fastify.use(require("webpack-hot-middleware")(compiler));


fastify.use('/api', function(req, res) {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, './api/elf.json'));  
});

fastify.listen(8888, () => {
    console.log('start listen on 8888')
})

var execa = require('execa')
var electron = require("electron")
//var desktopConfig = require("./webpack.desktop")


const desktopCompiler = webpack(desktop_config);
let electronStarted = false;
const watching = desktopCompiler.watch({}, (err, stats) => {

  if (!err && !stats.hasErrors() && !electronStarted) {
    electronStarted = true;
    execa(electron, [".", "--dev"], { stdio: "inherit" })
      .on("close", () => {
        watching.close();
        process.exit(0);
      });
  }
});
