const path = require('path');
const dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.js'
    ],
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
                }
            ]
        },{
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?&name=/fonts/[name].[ext]'
        }]
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    },
    "externals": {
        "electron": "require('electron')",
        "child_process": "require('child_process')",
        "fs": "require('fs')",
        "os": "require('os')",
        "url": "require('url')",
        "path": "require('path')",
        "readline": "require('readline')",
        "events": "require('events')",
        "net": "require('net')",
    },
    plugins: [
        new dotenv({
            path: './.env',
            safe: false
        })
    ]
};