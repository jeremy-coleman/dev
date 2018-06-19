const path = require('path')
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


const ROOT = path.resolve(__dirname, "..");
const getRoot = path.join.bind(path, ROOT);


module.exports = env => { 
return {
mode: `${env}`,

entry: {
      desktop: getRoot("src/desktop/desktop.ts"),
      app: getRoot("src/app/app.tsx")
    },
output: {
      filename: "[name]/[name].js",
      path: getRoot('dist')
    },

target: "electron-main",

node: {__dirname: false, __filename: false},

externals: [nodeExternals()],

resolve: {
  extensions: [".ts", ".js", ".tsx", ".jsx", ".json", ".scss", ".css", ".html"]
},

devtool: "source-map",

module: {
  rules: [
    {test: /\.[tj]sx?$/, loader: "ts-loader", options: { transpileOnly: true }},
    {test: /\.less$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader',use: ['css-loader',{loader: 'less-loader',options: {javascriptEnabled: true}}]})},
    {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
    {test: /\.css$/,use: ["style-loader", "css-loader"]},
    { test: /\.json$/, loader: 'json-loader' },
    { test: /\.(jp?g|png|gif)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'app/images/[hash].[ext]' } },
    { test: /\.(eot|woff2?|svg|ttf|otf)([\?]?.*)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'app/fonts/[hash].[ext]' } }
  ]
},

plugins: [
    new ExtractTextPlugin('[name].css'),
    new FriendlyErrorsWebpackPlugin({ clearConsole: env === "development" }),
    new CopyPlugin([{from: 'src/app/index.html', to: "app"}]),
    new CleanWebpackPlugin('dist', {root: getRoot()}),
    new BrowserSyncPlugin({server: {baseDir: [getRoot('dist/app')]},port: 3000,host: 'localhost',open: false, inject: true})]};
};
