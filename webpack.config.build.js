const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileListPlugin = require('./src/plugins/FileListPlugins')
const fs = require('fs');
const srcRoot = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, '../waimaiServer/public');
const pageDir = path.resolve(srcRoot, 'page');
const mainFile = 'index.js';

function getHtmlArray(entryMap) {
    let htmlArray = [];
    Object.keys(entryMap).forEach((key) => {
        let fullPathName = path.resolve(pageDir, key);
        let fileName = path.resolve(fullPathName, key + '.html');

        if (fs.existsSync(fileName)) {
            htmlArray.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: fileName,
                chunks: ['common', key]
            }));
        }


    });
    return htmlArray;
}

function getEntry() {
    let entryMap = {};

    fs.readdirSync(pageDir).forEach((pathname) => {
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
    mode: 'production',
    entry: entryMap,
    target: 'electron-renderer',
    resolve: {
        alias: {
            component: path.resolve(srcRoot, 'component')
        },
        extensions: ['.js', '.jsx', '.ts', ]
    },
    output: {
        path: distPath,
        filename: 'js/[name].[hash].min.js',
        publicPath: '/' // 可根据自己实际情况修改
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: [{
                    loader: 'babel-loader'
                }, {
                    loader: 'eslint-loader'
                }],
                include: srcRoot
            },
            {
                test: /\.ts?/,
                include: [
                    path.resolve(__dirname, "./src"),
                ],
                loader: "ts-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    'loader': 'css-loader',
                    options: {
                        minimize: true
                    }
                }],
                include: srcRoot
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: 'url-loader?limit=8192',
                include: srcRoot
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'common'
                }

            }
        }
    },
    plugins: [
        new CleanWebpackPlugin([distPath], {
            allowExternal: true
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/static',
                to: path.resolve(distPath, 'static'),
                force: true
            }
        ]),
        new FileListPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
        })
    ].concat(htmlArray)
};