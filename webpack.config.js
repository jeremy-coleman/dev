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


const merge = require('webpack-merge');

const mergeStrategy = merge.strategy({ entry: "prepend" });

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
    template: './src/client/index.hbs',
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

let CLIENT_PROD_CONFIG = {
    //externals: [nodeExternals()],

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
                test: endsWithFilter('.less'),
                use: [
                MiniCssExtractPlugin.loader,
                {loader: 'css-loader'},
                {loader: 'postcss-loader', options: {sourceMap: true }},
                {loader: 'resolve-url-loader'},
                {loader: 'less-loader', options: {allowJavascript: true}}
                ]
            },

            {
                test: endsWithFilter('.less'),
                use: [
                {loader: 'file-loader', options: {name: '[name].[hash:10].css'}}, 
                {loader: 'extract-loader'},
                {loader: 'css-loader'},
                {loader: 'postcss-loader', options: {sourceMap: true }},
                {loader: 'resolve-url-loader'},
                {loader: 'less-loader', options: {allowJavascript: true}}
                ]
            },

            {
                test: endsWithFilter('.css'),
                use: [
                {loader: 'file-loader', options: {name: '[name].[hash:10].css'}}, 
                {loader: 'extract-loader'},
                {loader: 'css-loader'},
                {loader: 'postcss-loader', options: {sourceMap: true }},
                {loader: 'resolve-url-loader'}
                ]
            },

            {
                test: endsWithFilter('.scss', '.sass'),
                use: [
                {loader: 'file-loader', options: {name: '[name].[hash:10].css'}}, 
                {loader: 'extract-loader'},
                {loader: 'css-loader'},
                {loader: 'postcss-loader', options: {sourceMap: true }},
                {loader: 'resolve-url-loader'},
                {loader: 'sass-loader'}
                ]
            },

            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                {loader: 'file-loader',options: {name: 'templates/[name].html'}}, //'[name].[hash:10].html'
                {loader: 'extract-loader'},
                {loader: 'html-loader'}
               ]
            },
            
            // All images and fonts will be optimized and their paths will be solved
            {
                enforce: 'pre',
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
                use: [ //'[name].[hash:10].[ext]'
                {loader: 'url-loader',options: {name: 'assets/[name].[ext]',limit: 8192 } },
                {loader: 'img-loader'}
               ]
            },

            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use: [
                {loader: 'underscore-template-loader', query: {attributes: ['img:src', 'link:href']}}
                ]
            },
            
            {
                test: /[\/\\]@angular[\/\\].+\.js$/,
                parser: {system: true}
            }
           
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
        ifDev(new webpack.EvalSourceMapDevToolPlugin({moduleFilenameTemplate: "[resource-path]",sourceRoot: "webpack:///"})),
        StartElectronPlugin,
        new WriteFilePlugin(),
        new MiniCssExtractPlugin(),
        ifProd(new TerserPlugin())
        //new UglifyJsPlugin()
    ])
}


let CLIENT_DEV_CONFIG = mergeStrategy(CLIENT_PROD_CONFIG, {
    stats: 'minimal',
    mode: 'development',
    
    entry: Object.keys(CLIENT_PROD_CONFIG.entry).reduce((o, k) => {
        o[k] = ['react-hot-loader/patch'];
        return o;
    }, {}),

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    
    devServer: {
        contentBase: CLIENT_PROD_CONFIG.output.path,
        publicPath: '/',
        historyApiFallback: true,
        hot: true,
        stats: 'minimal'
   
    }
});

let clientConfig = isProduction ? 
    CLIENT_PROD_CONFIG
  : CLIENT_DEV_CONFIG

module.exports = clientConfig


            //{test: /\.s?css$/, use: [MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader','resolve-url-loader','sass-loader']},