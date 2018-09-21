const isProduction = process.env.NODE_ENV === "production";
const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
//const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
//const TerserPlugin = require('terser-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);


const containsFilter = (...values) => filename => values.some(value => filename.indexOf(value) >= 0)
const isNodeModuleFile = containsFilter("node_modules");
const endsWithFilter = (...extensions) => filename => extensions.some(ext => filename.endsWith(ext));

const desktopConfig = {
target: "electron-main",
stats: 'minimal',
mode: 'production',
node: {
  __dirname: false,
  __filename: false
  },

externals: [nodeExternals()],

output: {
    path: getRoot('dist/desktop'),
    //pathinfo: true,
    filename: 'main.js',
    libraryTarget: 'commonjs2'
  },

entry: getRoot("src/desktop/main.ts"),

module: { 
      rules: [
        
        {test: /\.[tj]sx?$/, use: [{loader: 'ts-loader' , options: {transpileOnly: true}}]}]
    },
plugins: [
  //new TerserPlugin(),
  new CleanWebpackPlugin('dist', {root: getRoot()}),
  new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
  
]
}

module.exports = desktopConfig;




