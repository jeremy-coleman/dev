const isProduction = process.env.NODE_ENV === "production";
var path = require('path');

var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactJssHmrPlugin = require("react-jss-hmr/webpack")
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const WebpackShellPlugin = require('./tools/plugins/shell-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin')


const merge = require('webpack-merge');

const mergeStrategy = merge.strategy({ entry: "prepend" });


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



// sets flag to load html file or websocket in the electron window
let StartElectronPlugin = isProduction ? 
    new WebpackShellPlugin({onBuildEnd: {scripts: ['electron .']}})
  : new WebpackShellPlugin({onBuildEnd: {scripts: ['electron . --dev']}});


    const ifDev = plugin => !isProduction ? plugin : undefined;
    const ifProd = plugin => isProduction ? plugin : undefined;
    const removeEmpty = array => array.filter(p => !!p);
    const envSetting = isProduction ? 'production' : 'development';
    

let CLIENT_PROD_CONFIG = {
    //externals: [nodeExternals()],
    
    target: 'electron-renderer',
    
    // Configure whether to polyfill or mock certain Node.js globals and modules
    node: {
     __dirname: false,
     __filename: false
    },

    mode: envSetting,
    
    devtool: isProduction? undefined : 'eval-cheap-module-source-map',

    entry: {
        app: ['./src/client/main.tsx']
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
            
            //All images and fonts will be optimized and their paths will be solved
            {
                enforce: 'pre',
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
                use: [ //'[name].[hash:10].[ext]'
                {loader: 'url-loader', options: {name: '[name].[ext]',limit: 8192}}
               ]
            },
            
            {test: /[\/\\]@angular[\/\\].+\.js$/,parser: {system: true}}
           
        ]
    },

    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx", ".json", ".css", "scss"],
        modules:["src/client", "node_modules"],
         plugins: [
             new ReactJssHmrPlugin(),
             new TsConfigPathsPlugin()
        ]
    },

    stats: "minimal",
   
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(envSetting)}),
        new HtmlWebpackPlugin({template: './src/client/index.html'}),
        new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
        //ifDev(new webpack.EvalSourceMapDevToolPlugin({moduleFilenameTemplate: "[resource-path]",sourceRoot: "webpack:///"})),
        //new WriteFilePlugin(),
        new MiniCssExtractPlugin(),
        StartElectronPlugin
    ]
}


let CLIENT_DEV_CONFIG = mergeStrategy(CLIENT_PROD_CONFIG, {
    stats: 'minimal',
    mode: 'development',
    
    entry: Object.keys(CLIENT_PROD_CONFIG.entry).reduce((o, k) => {
        o[k] = ['react-hot-loader/patch'];
        return o;
    }, {}),

    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    
    devServer: {
        contentBase: CLIENT_PROD_CONFIG.output.path,
        publicPath: '/',
        historyApiFallback: true,
        hot: true,
        stats: 'minimal'
   
    },

    serve: {
        content: CLIENT_PROD_CONFIG.output.path,
        publicPath: '/',
        stats: 'minimal'
   
    }
});

let clientConfig = isProduction ? 
    CLIENT_PROD_CONFIG
  : CLIENT_DEV_CONFIG

module.exports = clientConfig


