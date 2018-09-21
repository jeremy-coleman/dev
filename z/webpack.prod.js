const isProduction = process.env.NODE_ENV === "production";
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const WebpackShellPlugin = require('./tools/webpack/plugins/shell-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);


const containsFilter = (...values) => filename => values.some(value => filename.indexOf(value) >= 0)
const isNodeModuleFile = containsFilter("node_modules");
const endsWithFilter = (...extensions) => filename => extensions.some(ext => filename.endsWith(ext));


const PACKAGE_JSON_INFO = require('./tools/webpack/variables')

let APP_CONFIG_PRODUCTION = {
      production: 'true',
      publicPath: './',
      buildVersion: "DEV",
      buildDate: new Date().toString(),
      env: {
        fabricFontBasePath: './',
        fabricIconBasePath: './icons/fabric/'
      }
    }

let AppConfig = APP_CONFIG_PRODUCTION

const appConfig = {
        target: 'electron-renderer',
        stats: 'minimal',

        mode: "production",

        entry: {
            'main': ["./src/client/main.tsx"],
            //'vendor/corejs': 'core-js/client/shim',
            //'vendor/zonejs': 'zone.js/dist/zone',
        },

        output: {
            filename: "[name].[chunkhash].js",
            path: path.resolve(__dirname, 'dist/client'),
            publicPath: './',
            libraryTarget: 'commonjs2',
            //pathinfo: true,
        },
        serve:{
            content: path.resolve(__dirname, 'dist/client')
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
            modules: [path.resolve(__dirname, "src/client"), "node_modules"],
            alias: {"package.json$": path.resolve(__dirname, "package.json")},
            plugins: [
              new TsConfigPathsPlugin({configFile: "./tsconfig.json"})
            ]
        },

        //devtool: "none",

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
            new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
            new webpack.DefinePlugin({'AppConfig': JSON.stringify(AppConfig)}),
            new webpack.DefinePlugin({'PACKAGE_JSON_INFO': JSON.stringify(PACKAGE_JSON_INFO)}),
            new MiniCssExtractPlugin(),
            new WebpackShellPlugin({onBuildEnd: {scripts: ['electron .']}})
        ] 
};

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
  new TerserPlugin(),
  new CleanWebpackPlugin('dist', {root: getRoot()}),
  new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
  
]
}



module.exports = [appConfig, desktopConfig];




