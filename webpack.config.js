const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cp = require('child_process');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);

//Html-webpack-plugin configuration
const indexConfig = {
    template: getRoot('src/app/index.hbs'),
    excludeChunks: ['desktop'],
    baseHref: './',
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
    
    const config = {
        
    mode: 'none',
    
    devtool: ifDev('eval-cheap-module-source-map'),

    entry: {
        'desktop': getRoot('src/desktop/main.ts'),
        'corejs': 'core-js/client/shim',
        'zonejs': 'zone.js/dist/zone',
        'app': getRoot('src/app/main.tsx')
    },
    
    output: {
        path: getRoot('dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {test: /\.tsx?$/,use: {loader: 'ts-loader', options: {transpileOnly: true}}, exclude: /node_modules/}, 
            
            {test: /\.s?css$/,
              use: [
                {loader: 'file-loader', options: {name: '[name].css'}}, //name: '[name].[hash:10].css'
                {loader: 'extract-loader'},
                {loader: 'css-loader', options: {minimize: true}},
                {loader: 'postcss-loader', options: {sourceMap: true }},
                {loader: 'resolve-url-loader'},
                {loader: 'sass-loader'}
                ]
            },

            {test: /\.html$/, exclude: /node_modules/,
              use: [
                {loader: 'file-loader',options: {name: '[name].html'}}, //'[name].[hash:10].html'
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

    stats: {
        warnings: false
    },

    target: 'node',
   
    node: {
        __dirname: false,
        __filename: false
    },

    externals: [nodeExternals()],

    plugins: removeEmpty([
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(envSetting)}),
        new CleanWebpackPlugin('dist', {root: getRoot()}),
        new HtmlWebpackPlugin(indexConfig),
        new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
        new webpack.EvalSourceMapDevToolPlugin({moduleFilenameTemplate: "[resource-path]",sourceRoot: "webpack:///"}),
        ifProd(new UglifyJsPlugin())
    ]),
    
};

    return config
}

module.exports = createConfig

        //new WebpackShellPlugin({onBuildEnd: ['lite-server . --dev']}),//'python script.py && node script.js'
        //new WriteFilePlugin()
        //        new webpack.EvalSourceMapDevToolPlugin({moduleFilenameTemplate: "[resource-path]",sourceRoot: "webpack:///"}),
        //new webpack.LoaderOptionsPlugin({debug: true}),
        
        //        new webpack.DefinePlugin({ __DEVELOPMENT__: Boolean(env.dev) }),
        
                //new webpack.LoaderOptionsPlugin({debug: true}),
        //ifProd(new MiniCssExtractPlugin({filename: '[name].[hash].css'})),
        
 //ifProd(new CopyWebpackPlugin([getRoot('package.json')])),
 
            //devServer: {
    //    historyApiFallback: true,
    //    before() {cp.exec('electron . --dev', { stdio: "inherit" }).on("close", () => {process.exit(0)})}
   // }, 