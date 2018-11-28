const webpack = require('webpack')
const path = require('path')
const CreateFileWebpack = require('create-file-webpack')
//const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const _ = require('lodash')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackShellPlugin = require('./tools/webpack/plugins/shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const htmlTemplate = require('./src/client/html-template.js')

const nodeExternals = require('webpack-node-externals')

let BUILD_DIR
let APP_PATH_STRING
let CSS_PATH_STRING
let APP_VERSION_STRING

const APP_DIR = path.resolve(__dirname, 'src/client')
const EXAMPLE_DIR = path.resolve(__dirname, 'examples/')

//const htmlTemplateCompiler = _.template(htmlTemplate)
const plugins = []


// const APP_VERSION_STRING
// const APP_PATH_STRING
// const CSS_PATH_STRING

// const config
module.exports = (env) => {
    BUILD_DIR = path.resolve(__dirname, 'dist/client')
    APP_VERSION_STRING = 'dev'
    APP_PATH_STRING = ''
    CSS_PATH_STRING = ''
  
  return {
    //externals: [nodeExternals()],
    target: 'electron-renderer',
    entry: `${APP_DIR}/index.tsx`,
    output: {
      path: BUILD_DIR,
      filename: 'iodide.js',
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?/,
          include: APP_DIR,
          use: [
            {loader: 'babel-loader'},
            //{loader: 'ts-loader', options: {transpileOnly: true}}
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          loader: `file-loader?name=fonts/[name].[ext]`,
        },
        {
          test: /\.jsmd$/,
          include: EXAMPLE_DIR,
          loader: 'raw-loader',
        },
      ],
    },
    watchOptions: { poll: true },
    plugins: [
      ...plugins,
            new HtmlWebpackPlugin({
                title: "Coglite",
                template: "src/client/index.html"
            }),

      new webpack.DefinePlugin({
        EXAMPLE_DIRECTORY_BASE_URL: JSON.stringify(__dirname),
        APP_VERSION: JSON.stringify(APP_VERSION_STRING),
        JS_BUNDLE_PATH: JSON.stringify(APP_PATH_STRING),
        CSS_BUNDLE_PATH: JSON.stringify(CSS_PATH_STRING),
        APP_ENV: JSON.stringify(env),
      }),
      new MiniCssExtractPlugin('styles.css'),
      //new MiniCssExtractPlugin('styles.css'),
      new WebpackShellPlugin({onBuildEnd: {scripts: ['electron .']}})
    ],
  }
}

// module.exports = config
