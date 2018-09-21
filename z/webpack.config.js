const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const WebpackShellPlugin = require('./tools/webpack/plugins/shell-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);
const containsFilter = (...values) => filename => values.some(value => filename.indexOf(value) >= 0)
const isNodeModuleFile = containsFilter("node_modules");
const endsWithFilter = (...extensions) => filename => extensions.some(ext => filename.endsWith(ext));

const PACKAGE_JSON_INFO = require('./tools/webpack/variables')

let APP_CONFIG_DEVELOPMENT = {
      production: 'false',
      publicPath: '/',
      buildVersion: "DEV",
      buildDate: new Date().toString(),
      env: {
        fabricFontBasePath: '/',
        fabricIconBasePath: '/icons/fabric/'
      }
    }

let AppConfig = APP_CONFIG_DEVELOPMENT


module.exports = {
        //target: 'electron-renderer',
        devtool: "eval",
        mode: "development",

        entry: {
            'main': ["react-hot-loader/patch", "./src/client/main.tsx"],
            //'vendor/corejs': 'core-js/client/shim',
            //'vendor/zonejs': 'zone.js/dist/zone',
        },

        output: {
            filename: "[name].js",
            path: getRoot('dist/client'),
            publicPath: '/'
        },
        serve:{
            content: getRoot('dist/client')
        },

        module: {
            rules: [
            
                {
                 test: endsWithFilter(".less"),
                  use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader'}, //, options: {minimize: true} options: {sourceMap: true }
                    {loader: 'postcss-loader'},
                    {loader: 'less-loader',options: {javascriptEnabled: true}}
                    ]
                },



                {
                 test: endsWithFilter(".scss", ".sass", ".css"),
                  use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader'}, //, options: {minimize: true} options: {sourceMap: true }
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'}
                    ]
                },

                {
                    test: endsWithFilter(".ts", ".tsx"),
                    loader: "ts-loader",
                    options: {transpileOnly: true},
                    exclude: isNodeModuleFile
                },

                {
                    test: endsWithFilter(".jpg", ".png", ".gif"),
                    use: [{ loader: "file-loader" }]
                }

            ]
        },
        resolve: {
            extensions: [".js", ".jsx", ".tsx", ".ts"],
            modules: [getRoot("src/client"), "node_modules"],
            alias: {"package.json$": getRoot("package.json")},
            plugins: [
              new TsConfigPathsPlugin({configFile: "./tsconfig.json"})]
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: "Coglite",
                template: "src/client/index.html"
            }),

            new CopyWebpackPlugin([
                { from: "tools/assets/fonts/ms", to: "fonts" },
                { from: "node_modules/@uifabric/icons/fonts", to: "icons/fabric"}
            ]),
            new WriteFilePlugin(),
            new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
            new webpack.DefinePlugin({'AppConfig': JSON.stringify(AppConfig)}),
            new webpack.DefinePlugin({'PACKAGE_JSON_INFO': JSON.stringify(PACKAGE_JSON_INFO)}),
            new MiniCssExtractPlugin(),
            new WebpackShellPlugin({onBuildEnd: {scripts: ['electron . --dev']}})
        ]
};

// //same style config as above - using other for ease of future config
// {test: /\.(sa|sc|c)ss$/, use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader']},
// {test: /\.less$/, use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader']},

// // tsconfig paths options example
// new TsConfigPathsPlugin({
//   configFile: "./tsconfig.json",
//   logLevel: "info",
//   extensions: [".ts", ".tsx", ".js", ".jsx"],
//   mainFields: ["browser", "main", "module", "js:next"],
//  baseUrl: "/foo"
// })