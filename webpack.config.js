const isProduction = process.env.NODE_ENV === "production";
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cp = require('child_process');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const WebpackShellPlugin = require('./tools/plugins/shell-plugin');
//const PurifyCSSPlugin = require("purifycss-webpack");
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);



// Html-webpack-plugin configuration
const indexConfig = {
    template: './src/client/index.hbs',
    excludeChunks: ['desktop'],
    baseHref: isProduction ? './' : './',
    chunksSortMode: (chunk1, chunk2) => {
        let orders = ['corejs', 'zonejs', 'app'];
        return orders.indexOf(chunk1.names[0]) - orders.indexOf(chunk2.names[0]);
    }
};


const createConfig = (env) => {
    const ifDev = plugin => env.dev ? plugin : undefined;
    const ifProd = plugin => env.prod ? plugin : undefined;
    const removeEmpty = array => array.filter(p => !!p);
    const envSetting = env.prod ? 'production' : 'development';
    

 
 const compilerConfig = {
    target: 'electron-main',
    
    // Configure whether to polyfill or mock certain Node.js globals and modules
    node: {
        __dirname: false,
      //  __filename: false
    },

    
    devServer: {
        historyApiFallback: true,
        // Execute custom middleware after all other middleware internally within the server
        // after() {
        //     // Fix whitescreen bug on build with Electron BrowserWindow
        //     exec('electron . --dev');
        // }
    },
    
    mode: 'development',
    
    devtool: ifDev('eval-cheap-module-source-map'),

    entry: {
        'vendor/corejs': 'core-js/client/shim',
        'vendor/zonejs': 'zone.js/dist/zone',
        'app': ['react-hot-loader/patch', './src/client/main.tsx'],
        'desktop': './src/desktop/main.ts',
    },
    
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    
    externals: [nodeExternals()],
    
    module: {
        rules: [
            {test: /\.tsx?$/, use: [
                //{loader: 'react-hot-loader/patch'},
                {loader: 'ts-loader', options: {transpileOnly: true}}, 
            ],
            exclude: /node_modules/
            },
            
            
            {test: /\.s?css$/,
              use: [
                {loader: 'file-loader', options: {name: '[name].[hash:10].css'}}, //name: '[name].[hash:10].css'
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
            
             {test: /[\/\\]@angular[\/\\].+\.js$/, parser: {system: true}}
           
        ]
    },

    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"]
    },

    stats: "minimal",
   
    externals: [nodeExternals()],

    plugins: removeEmpty([
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(envSetting)}),
        new HtmlWebpackPlugin(indexConfig),
        new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
        new webpack.EvalSourceMapDevToolPlugin({moduleFilenameTemplate: "[resource-path]",sourceRoot: "webpack:///"}),
        new CleanWebpackPlugin('dist', {root: getRoot()}),
        new WebpackShellPlugin({onBuildEnd: {scripts: ['electron . --dev']}}),
        new UglifyJsPlugin()
    ])
};

    return compilerConfig
}

module.exports = createConfig
