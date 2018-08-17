const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cp = require('child_process');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");



const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);


const createConfig = (env) => {
    const ifDev = plugin => env.dev ? plugin : undefined;
    const ifProd = plugin => env.prod ? plugin : undefined;
    const removeEmpty = array => array.filter(p => !!p);
    const envSetting = env.prod ? 'production' : 'development';
    
 const config = {
        
    mode: 'none',
    
    devtool: ifDev('eval-cheap-module-source-map'),

    entry: {
        'desktop': env.dev ? getRoot('src/desktop/main.dev.ts') : getRoot('src/desktop/main.ts')},
    
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
        ifProd(new CleanWebpackPlugin('dist', {root: getRoot()})),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(envSetting)}),
        new webpack.EvalSourceMapDevToolPlugin({moduleFilenameTemplate: "[resource-path]",sourceRoot: "webpack:///"}),
        ifProd(new UglifyJsPlugin())
    ])
};

    return config
}

module.exports = createConfig
