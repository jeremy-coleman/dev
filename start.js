const cp = require('child_process')
const electron = require("electron");
const webpack = require("webpack");
const config = require("./webpack.config");

const dev = 'true'

const compiler = webpack(config(dev));
let electronStarted = false;

const watching = compiler.watch({}, (err, stats) => {
  if (!err && !stats.hasErrors() && !electronStarted) {
    electronStarted = true;

    cp.spawn(electron, ["."], { stdio: "inherit" })
      .on("close", () => {
        watching.close();
      });
  }
});