var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require("write-file-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
var nodeExternals = require("webpack-node-externals");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);
const SRC = getRoot('src')


const publicPath = "";

const defaultAppEnv = {
        fabricFontBasePath: publicPath.endsWith("/") ? publicPath.substring(0, publicPath.length - 1) : publicPath,
        fabricIconBasePath: `${publicPath.endsWith("/") ? publicPath.substring(0, publicPath.length - 1) : publicPath}/icons/fabric/`
    };

const AppConfig = {
        production: false,
        publicPath: publicPath,
        buildVersion: "DEV",
        buildDate: new Date().toString(),
        env: defaultAppEnv
};

// const indexConfig = {
//     template: './src/client/index.hbs',
//     excludeChunks: ['desktop'],
//     baseHref: isProduction ? './' : './',
//     chunksSortMode: (chunk1, chunk2) => {
//         let orders = ['corejs', 'zonejs', 'app'];
//         return orders.indexOf(chunk1.names[0]) - orders.indexOf(chunk2.names[0]);
//     }
// };



//target electron-renderer makes it fucks up w/ some configs

const app_config = {
  
node: {
      __dirname: true,
      __filename: true,
    },

externals: [nodeExternals()],

target: 'electron-renderer',

mode: "production",

entry: {
  app: './src/app/app'
},

output: {
    publicPath: '',
    path: path.join(__dirname, 'dist/app'),
    filename: '[name].js',
},

module: {
  rules: [
    
      {
        test: /\.[tj]sx?$/, exclude: /node_modules/, use: [
        {loader: "babel-loader", options: { 
          babelrc: false,
          plugins: [
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          ["@babel/plugin-proposal-class-properties", { "loose" : true }],
          ["@babel/plugin-proposal-object-rest-spread", { "useBuiltIns": true }],
          ["mobx-deep-action"],
          ["mobx-async-action"],
          "@babel/plugin-proposal-pipeline-operator",
          ["@babel/plugin-transform-modules-commonjs", { "noInterop": true }],
          ["module-resolver",{"extensions": [".js", ".jsx", ".ts", ".tsx"], "root": ["."]}]
        ],
        
        presets: [
          "@babel/typescript",
          "@babel/react",
          ["@babel/env", {"targets": {"browsers": "last 2 Chrome versions","node": "current"}}]
        ]
      }
      }]
    }, 
    
                // All images and fonts will be optimized and their paths will be solved
    {
        enforce: 'pre',test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        use: [
           {loader: 'url-loader',options: {name: 'assets/[name].[ext]',limit: 8192 } }, //'[name].[hash:10].[ext]'
           {loader: 'img-loader'}
        ]
    },
    
    //{test: /\.(sa|sc|c)ss$/, use: [MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader','resolve-url-loader','sass-loader']},
    {test: /\.less$/, use: [MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader','resolve-url-loader','less-loader']},

    //{test: /\.less$/,use: ["style-loader", "css-loader", "less-loader"]},
    {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
    {test: /\.css$/,use: ["style-loader", "css-loader"]},
    {test: /\.json$/, loader: 'json-loader' },
    
    //{test: /\.(png|ttf|eot|svg|woff|woff2)(\?.+)?$/,loader: "file-loader"}
    
    ],
},

resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    mainFields: ['browser','module','jsnext:main','main'],
    modules: ["src", "node_modules"],
    alias: {"package.json$": "./package.json"}
  },
plugins: [
      new HtmlWebpackPlugin({
                title: "Coglite",
                template: "src/app/index.template.ts",
                AppConfig: AppConfig,
                //chunksSortMode: "none"
      }),
      new CopyWebpackPlugin([
                { from: "fonts/ms", to: "fonts" },
                { from: "node_modules/@uifabric/icons/fonts", to: "icons/fabric" },
                { from: "node_modules/material-components-web/dist/material-components-web.min.css", to: "css/material-components-web.css" },
                { from: "node_modules/@blueprintjs/core/lib/css/blueprint.css", to: "css/blueprint.css" },
                { from: "node_modules/@blueprintjs/datetime/lib/css/blueprint-datetime.css", to: "css/blueprint-datetime.css" },
                { from: "node_modules/@blueprintjs/table/lib/css/table.css", to: "css/blueprint-table.css" },
                { from: "node_modules/antd/dist/antd.min.css", to: "css/antd.css" }
      ]),
      new TerserPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),
      new MiniCssExtractPlugin()
]
}


const desktop_config = {
      
target: "electron-main",   

mode: 'production',

entry: './src/desktop/main.ts',

output: {
  path: path.resolve('./dist/desktop'),
  filename: 'desktop.js'
},

module: { 
  rules: [
      
      {
        test: /\.[tj]sx?$/, exclude: /node_modules/, use: [
        {loader: "babel-loader", options: { 
          babelrc: false,
          plugins: [
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          ["@babel/plugin-proposal-class-properties", { "loose" : true }],
          ["@babel/plugin-proposal-object-rest-spread", { "useBuiltIns": true }],
          ["mobx-deep-action"],
          ["mobx-async-action"],
          "@babel/plugin-proposal-pipeline-operator",
          ["@babel/plugin-transform-modules-commonjs", { "noInterop": true }],
          ["module-resolver",{"extensions": [".js", ".jsx", ".ts", ".tsx"], "root": ["."]}]
        ],
        
        presets: [
          "@babel/typescript",
          "@babel/react",
          ["@babel/env", {"targets": {"browsers": "last 2 Chrome versions","node": "current"}}]
        ]
      }
      }]
    }, 
    
  ]
},

resolve: { 
      extensions: [".ts", ".js", ".tsx", ".jsx", ".json", ".scss", ".css", ".html"],
      mainFields: ["electron-main", "module", "main"],
      modules: ["src", "node_modules"]
},
    
//devtool: "#source-map",
    
node: {
      __dirname: true,
      __filename: true,
    },

externals: [nodeExternals()],

plugins: [
      new CleanWebpackPlugin('dist'),
      new TerserPlugin(),
      new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}})
      ]

}

module.exports = [app_config, desktop_config]
