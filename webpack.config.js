const dev = process.env.NODE_ENV === "dev" || false;
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cp = require('child_process');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require("write-file-webpack-plugin");
var WebpackShellPlugin = require('webpack-shell-plugin');
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");


const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);

//Html-webpack-plugin configuration
const indexConfig = {
    template: getRoot('src/app/index.hbs'),
    excludeChunks: ['electron'],
    baseHref: dev ? '/' : './',
    chunksSortMode: (chunk1, chunk2) => {
        let orders = ['corejs', 'zonejs', 'app'];
        return orders.indexOf(chunk1.names[0]) - orders.indexOf(chunk2.names[0]);
    }
};


module.exports = dev => {
    return {

    mode: 'none',
    devtool: dev ? 'eval-cheap-module-source-map' : false,
    devServer: {
        historyApiFallback: true,
        before() {cp.exec('electron . --dev', { stdio: "inherit" }).on("close", () => {process.exit(0)})}
    }, 

    entry: {
        'electron': getRoot('src/desktop/electron.ts'),
        'corejs': 'core-js/client/shim',
        'zonejs': 'zone.js/dist/zone',
        'app': getRoot('src/app/main.ts')
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {test: /\.ts$/,use: {loader: 'ts-loader', options: {transpileOnly: true}}, exclude: /node_modules/}, 
            
            {test: /\.s?css$/, use: [
                {loader: 'file-loader', options: {name: '[name].[hash:10].css'}},
                'extract-loader',
                {loader: 'css-loader', options: {minimize: !dev}},
                {loader: 'postcss-loader', options: {sourceMap: dev }},
                'resolve-url-loader',
                'sass-loader']}, 

            {test: /\.html$/, exclude: /node_modules/,use: [
                {loader: 'file-loader',options: {name: '[name].[hash:10].html'}},
                'extract-loader',
                'html-loader']}, 
     
            {enforce: 'pre',test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,use: [
                {loader: 'url-loader',options: {name: '[name].[hash:10].[ext]',limit: 8192 } },
                {loader: 'img-loader'}]},

            {test: /\.hbs$/,exclude: /node_modules/,use: 
                {loader: 'underscore-template-loader', query: {attributes: ['img:src', 'link:href']}}},
            
            {test: /[\/\\]@angular[\/\\].+\.js$/, parser: {system: true} }
        ]
    },

    resolve: {
        extensions: [".ts", ".js"]
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

    plugins: [
        new HtmlWebpackPlugin(indexConfig),
        new Webpack.ContextReplacementPlugin(/angular([\\\/])core([\\\/])/, path.resolve(getRoot('src'))),
        new CopyWebpackPlugin([getRoot('package.json')]),
        new FriendlyErrorsWebpackPlugin({ clearConsole: dev === "true" }),
        //new WebpackShellPlugin({onBuildEnd: ['lite-server . --dev']}),//'python script.py && node script.js'
        //new WriteFilePlugin()
    ],
};


if (!dev) {
    webpackConfig.plugins.push(new CleanWebpackPlugin('dist', {root: getRoot()}));
    webpackConfig.plugins.push(new UglifyJsPlugin());
}

}