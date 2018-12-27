const isProduction = process.env.NODE_ENV === "production";
var path = require('path');

var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')

const WebpackShellPlugin = require('./tools/plugins/shell-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");

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


    const ifDev = plugin => !isProduction ? plugin : undefined;
    const ifProd = plugin => isProduction ? plugin : undefined;
    const removeEmpty = array => array.filter(p => !!p);
    const envSetting = isProduction ? 'production' : 'development';
    
// nodeExternals fucks up hmr

module.exports = {
    externals: [nodeExternals()],
    
    //target: 'electron-renderer',
    
    // Configure whether to polyfill or mock certain Node.js globals and modules
    // node: {
    //  __dirname: false,
    //  __filename: false
    // },

    mode: 'production',
    
    devtool:undefined,

    entry: {
        host: ['./src/@coglite/common/index.ts']
    },
    
    output: {
        path: getRoot('lib/core'),
        filename: 'coglite-core.js'
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
        extensions: [".ts", ".js", ".tsx", ".jsx"],
        plugins: [
             new TsConfigPathsPlugin()
        ]
    },

    stats: "minimal",
   
    plugins: removeEmpty([
        new WebpackShellPlugin({onBuildEnd: {scripts: ['electron .']}}),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
        new HtmlWebpackPlugin({template: './src/client/index.html'}),
        new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
        new MiniCssExtractPlugin(),
        new TerserPlugin(),
        new UnusedFilesWebpackPlugin({
        globOptions: {
          ignore: ["*",
          "!src/**/*.*"]
        }
      })
    ])
}