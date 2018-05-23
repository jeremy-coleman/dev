var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require("write-file-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const ROOT = path.resolve(__dirname);
const getRoot = path.join.bind(path, ROOT);
const SRC = getRoot('src')


const publicPath = "/";;

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

//dont target electron-renderer bc it fucks up
const appWebpackConfig = {

mode: "development",

entry: ['webpack-hot-middleware/client', getRoot('src/app/app')],

output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist/app'),
    filename: 'app.js',
},

module: {
  rules: [
    {test: /\.tsx?$/, exclude: /node_modules/, use: ['babel-loader']},
    {test: /\.less$/,use: ["style-loader", "css-loader", "less-loader"]},
    {test: /\.scss$/,use: ["style-loader","css-loader","sass-loader"]},
    {test: /\.css$/,use: ["style-loader", "css-loader"]},
    {test: /\.json$/, loader: 'json-loader' },
    {test: /\.(png|ttf|eot|svg|woff|woff2)(\?.+)?$/,loader: "url-loader"}
    ],
},

resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    mainFields: ['browser','module','jsnext:main','main'],
    modules: [getRoot("src"), "node_modules"],
    alias: {"package.json$": getRoot("package.json")}
  },
plugins: [
      new HtmlWebpackPlugin({
                title: "Coglite",
                template: "src/app/index.template.ts",
                AppConfig: AppConfig,
                chunksSortMode: "none"
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new WriteFilePlugin()
      //new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}})
]
}

module.exports = appWebpackConfig
