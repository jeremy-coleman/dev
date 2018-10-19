const isProduction = process.env.NODE_ENV === "production";
var path = require('path');
var fs = require('fs')
var cp = require('child_process');

var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')

const WebpackShellPlugin = require('./tools/plugins/shell-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin')


//const PurifyCSSPlugin = require("purifycss-webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);

const containsFilter = (...values) => {
    return (filename) => {
        return values.some(value => {
            return filename.indexOf(value) >= 0;
        });
    }
};

const isNodeModuleFile = containsFilter("node_modules");

const endsWithFilter = (...extensions) => {
    return (filename) => {
        return extensions.some(ext => {
            return filename.endsWith(ext);
        });
    };
};


let RUNTIME_APP_CONFIG = {
      production: isProduction ? 'true' : 'false',
      publicPath: isProduction ? './' : '/',
      buildVersion: "DEV",
      buildDate: new Date().toString(),
      env: {
        fabricFontBasePath: isProduction ? './' : '/',
        fabricIconBasePath: isProduction ? './icons/fabric/' : '/icons/fabric/'
      }
    }

// Html-webpack-plugin configuration
const indexConfig = {
    //template: './src/client/index.hbs',
    template: './src/client/index.html',
    baseHref: isProduction ? './' : '/',
    chunksSortMode: (chunk1, chunk2) => {
        let orders = ['corejs', 'zonejs', 'app'];
        return orders.indexOf(chunk1.names[0]) - orders.indexOf(chunk2.names[0]);
    }
};

// sets flag to load html file or websocket in the electron window
let StartElectronPlugin = isProduction ? 
    new WebpackShellPlugin({onBuildEnd: {scripts: ['electron .']}})
  : new WebpackShellPlugin({onBuildEnd: {scripts: ['electron . --dev']}});


    const ifDev = plugin => !isProduction ? plugin : undefined;
    const ifProd = plugin => isProduction ? plugin : undefined;
    const removeEmpty = array => array.filter(p => !!p);
    const envSetting = isProduction ? 'production' : 'development';
    
// nodeExternals fucks up hmr

module.exports = {
    externals: [nodeExternals()],
    
    target: 'electron-renderer',
    
    // Configure whether to polyfill or mock certain Node.js globals and modules
    node: {
     __dirname: false,
     __filename: false
    },

    mode: envSetting,
    
    devtool: isProduction ? undefined : 'eval-cheap-module-source-map',

    entry: {
        'corejs': 'core-js/client/shim',
        'zonejs': 'zone.js/dist/zone',
        // full path might fuck up client router , not sure yet
        //'app': [getRoot('src/client/main.tsx')]
        'app': ['./src/client/main.tsx']
    },
    
    output: {
        path: getRoot('dist/client'),
        filename: '[name].js'
    },
    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{loader: 'ts-loader', options: {transpileOnly: true}}],
                exclude: /node_modules/
            },

            {
                test: endsWithFilter('.css', '.scss', '.sass'),
                use: [
                MiniCssExtractPlugin.loader,
                {loader: 'css-loader', options: {sourcemaps: true}},
                {loader: 'postcss-loader', options: {sourcemaps: true}},
                {loader: 'sass-loader'}
                ]
            },
            
            // All images and fonts will be optimized and their paths will be solved
            {
                enforce: 'pre',
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
                use: [ //'[name].[hash:10].[ext]'
                {loader: 'url-loader', options: {name: '[name].[ext]',limit: 8192, outputPath: 'assets' } }
               ]
            },
            
            {test: /[\/\\]@angular[\/\\].+\.js$/,parser: {system: true}}
           
        ]
    },

    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"]
    },

    stats: "minimal",
   
    plugins: removeEmpty([
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(envSetting)}),
        new webpack.DefinePlugin({'process.env.APP_CONFIG': JSON.stringify(RUNTIME_APP_CONFIG)}),
        new HtmlWebpackPlugin(indexConfig),
        new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
        StartElectronPlugin,
        new MiniCssExtractPlugin(),
        new TerserPlugin()
    ])
}