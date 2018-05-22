const path = require('path')
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const ROOT = path.resolve(__dirname, "..");
const getRoot = path.join.bind(path, ROOT);


module.exports = env => {
return {
mode: `${env}`,

entry: {
      desktop: getRoot("src/desktop/main.ts"),
      app: getRoot("src/app/app.tsx")
    },
output: {
      filename: "[name]/[name].js",
      path: getRoot('dist')
    },

target: "node",

node: {__dirname: false, __filename: false},

externals: [nodeExternals()],

resolve: {
  extensions: [".ts", ".js", ".tsx", ".jsx", ".json", ".scss", ".css", ".html"]
},
devtool: "source-map",

module: {
  rules: [
    //{test: /\.[tj]sx?$/, loader: "ts-loader", options: { transpileOnly: true }},
    {test: /\.[tj]sx?$/, loader: "babel-loader"},
    {test: /\.less$/,use: ["style-loader", "css-loader", "less-loader"]},
    {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
    {test: /\.css$/,use: ["style-loader", "css-loader"]},
    { test: /\.json$/, loader: 'json-loader' },
    { test: /\.(jp?g|png|gif)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'images/[hash].[ext]' } },
    { test: /\.(eot|woff2?|svg|ttf|otf)([\?]?.*)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'fonts/[hash].[ext]' } }
  ]
},

plugins: [
    new FriendlyErrorsWebpackPlugin({ clearConsole: env === "development" }),
    new CopyPlugin([{from: 'src/app/app.html', to: "app"}]),
    new CleanWebpackPlugin('dist', {root: getRoot()})
    ]
  };
};
