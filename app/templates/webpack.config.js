'use strict';

var path = require('path')
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: [
            './src/main.js'
        ]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loaders: [
                'babel?presets[]=es2015',
            ],
            exclude: /node_modules/
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'url-loader'
        }, {
            test: /\.(gif|jpg|png)/,
            loader: 'url-loader?limit=8192&name=[path][name].[ext]'
        }, {
            test: /\.css$/,
            loader: 'style!css',
            //exclude: /node_modules/,
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass!autoprefixer',
            exclude: /node_modules/,
            //loader:ExtractTextPlugin.extract('css!sass!autoprefixer')//不支持多参数
        }, {
            test: /\.html$/,
            loader: 'html-withimg-loader',
            exclude: /node_modules/,
        }]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/' || __dirname,
        filename: '[name].js'
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Mock: 'mockjs'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js'),
        //new ExtractTextPlugin('[name].css',{
        //  allChunks:true
        //}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
}