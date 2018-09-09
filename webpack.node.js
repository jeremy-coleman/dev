var path = require('path')
var webpack = require('webpack')
var nodeExternals = require("webpack-node-externals");
var CleanWebpackPlugin = require('clean-webpack-plugin');


const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);



const desktopConfig = {

target: "electron-main",   

mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

stats: 'minimal',

entry: {
  main: ['./src/desktop/main.ts']
  //main: getRoot('src/desktop/main.ts')
},

output: {
  path:  getRoot('dist/desktop'),
  filename: 'main.js'
},


module: {
  rules: [
    {test: /\.ts$/, loader: 'ts-loader', options: { transpileOnly: true }}
  ]},

resolve: {
  extensions: ['.js', '.json', '.ts']},

plugins: [
  new CleanWebpackPlugin('dist', {root: getRoot()}),
  new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})],

externals: [nodeExternals()]
}

module.exports = desktopConfig


//new ExecaPlugin(({onBuildEnd: [{args: ["."], cmd: "electron", stdio: 'inherit'}]})) 

