const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const FileListPlugin = require('./src/plugins/FileListPlugins')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');
const srcRoot = path.resolve(__dirname, 'src');
const devPath = path.resolve(__dirname, 'dev');
const pageDir = path.resolve(srcRoot, 'page');
const mainFile = 'index.js';
console.log(srcRoot)
console.log(pageDir)
function getHtmlArray(entryMap){
    let htmlArray = [];
    Object.keys(entryMap).forEach((key)=>{
        let fullPathName = path.resolve(pageDir, key);
        let fileName = path.resolve(fullPathName, key + '.html');

        if (fs.existsSync(fileName)) {
            htmlArray.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: fileName,
                chunks: [ 'common', key]
            }));
        }


    });
    return htmlArray;
}

function getEntry(){
    let entryMap = {};

    fs.readdirSync(pageDir).forEach((pathname)=>{
        let fullPathName = path.resolve(pageDir, pathname);
        let stat = fs.statSync(fullPathName);
        let fileName = path.resolve(fullPathName, mainFile);

        if (stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathname] = fileName;
        }
    });

    return entryMap;

}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);
module.exports = {
    mode: 'development',
    devServer: {
        contentBase: devPath,
        hot: true,
        port:9000
    },
    target:'electron-renderer',
    entry: entryMap,
    resolve: {
        alias: {
            component: path.resolve(srcRoot, 'components')//将起始路径设置为component
        },
        extensions: ['.js','.jsx',]
    },
    output: {
        path: devPath,
        filename: '[name].min.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: [{loader: 'babel-loader'},{loader: 'eslint-loader'}],include: srcRoot},
            // { test: /\.css$/ , use:['style-loader',{'loader':'css-loader',options:{minimize: true}}] ,include: srcRoot},
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
              },
            { test: /\.less$/ , use:['style-loader','css-loader','less-loader']},
            { test: /\.(png|jpg|jpeg)$/, use: 'url-loader?limit=8192' , include: srcRoot},
            {
                test: /\.ts?/,
                include: [
                    path.resolve(__dirname, "./src"),
                ],
                loader: "ts-loader"
            }, 
        ]
    },
    optimization: {
        splitChunks:{
            cacheGroups:{
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'common'
                }
            }
        }
    },
 
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new FileListPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ].concat(htmlArray)
};