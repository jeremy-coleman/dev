const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cp = require('child_process');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");


//const PurifyCSSPlugin = require("purifycss-webpack");
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);


const createConfig = (env) => {
    const ifDev = plugin => env.dev ? plugin : undefined;
    const ifProd = plugin => env.prod ? plugin : undefined;
    const removeEmpty = array => array.filter(p => !!p);
    const envSetting = env.prod ? 'production' : 'development';
    
    
 
    const clientConfig = {
        
    mode: 'none',
    
    devtool: ifDev('eval-cheap-module-source-map'),

    entry: {
        'vendor/corejs': 'core-js/client/shim',
        'vendor/zonejs': 'zone.js/dist/zone',
        'app': getRoot('src/client/main.tsx')
    },
    
    output: {
        path: getRoot('dist/client'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {test: /\.tsx?$/,use: {loader: 'ts-loader', options: {transpileOnly: true}}, exclude: /node_modules/}, 
            
            {test: /\.s?css$/,
              use: [
                {loader: 'file-loader', options: {name: 'styles/[name].css'}}, //name: '[name].[hash:10].css'
                {loader: 'extract-loader'},
                {loader: 'css-loader', options: {minimize: true}},
                {loader: 'postcss-loader', options: {sourceMap: true }},
                {loader: 'resolve-url-loader'},
                {loader: 'sass-loader'}
                ]
            },

            {test: /\.html$/, exclude: /node_modules/,
              use: [
                {loader: 'file-loader',options: {name: 'templates/[name].html'}}, //'[name].[hash:10].html'
                {loader: 'extract-loader'},
                {loader: 'html-loader'}
               ]
            },
            
            // All images and fonts will be optimized and their paths will be solved
            {enforce: 'pre',test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
              use: [
                {loader: 'url-loader',options: {name: 'assets/[name].[ext]',limit: 8192 } }, //'[name].[hash:10].[ext]'
                {loader: 'img-loader'}
               ]
            },

            {test: /\.hbs$/,exclude: /node_modules/,
             use: [
                {loader: 'underscore-template-loader', query: {attributes: ['img:src', 'link:href']}}
             ]
            },
           
        ]
    },

    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"]
    },

    stats: "minimal",

    target: 'node',
   
    node: {
        __dirname: false,
        __filename: false
    },

    externals: [nodeExternals()],

    plugins: removeEmpty([
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(envSetting)}),
        new HtmlWebpackPlugin({
            template: getRoot('src/client/index.hbs'),
            baseHref: '',
            chunksSortMode: (chunk1, chunk2) => {
            let orders = ['corejs', 'zonejs', 'app'];
            return orders.indexOf(chunk1.names[0]) - orders.indexOf(chunk2.names[0]);
            }
        }),
        new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
        new webpack.EvalSourceMapDevToolPlugin({moduleFilenameTemplate: "[resource-path]",sourceRoot: "webpack:///"}),
        new UglifyJsPlugin()
    ])
};

const desktopConfig = {
        
    mode: 'none',
    
    devtool: ifDev('eval-cheap-module-source-map'),

    entry: {
        'desktop': getRoot('src/desktop/main.ts')
    },
    
    output: {
        path: getRoot('dist/desktop'),
        filename: 'main.js'
    },

    module: {
        rules: [
            {test: /\.tsx?$/,use: {loader: 'ts-loader', options: {transpileOnly: true}}, exclude: /node_modules/}, 
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"]
    },

    stats: "minimal",

    target: 'node',
   
    node: {
        __dirname: false,
        __filename: false
    },

    externals: [nodeExternals()],

    plugins: removeEmpty([
        new CleanWebpackPlugin('dist', {root: getRoot()}),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(envSetting)}),
        new webpack.EvalSourceMapDevToolPlugin({moduleFilenameTemplate: "[resource-path]",sourceRoot: "webpack:///"}),
        new UglifyJsPlugin()
    ])
};


    return [clientConfig, desktopConfig]
}

module.exports = createConfig
