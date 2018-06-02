const path = require('path');
const dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const extractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new extractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    entry: [ "babel-polyfill", './src/index.js'],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-async-to-generator']
                    }
                }
            ]
        },{
            test: /\.s?css$/,
            use: extractPlugin.extract({
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?&name=/fonts/[name].[ext]'
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    },
    plugins: [
        new dotenv({
            path: './.env',
            safe: false
        }),
        extractPlugin,
        new webpack.DefinePlugin({ //<--key to reduce React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};
