'use strict';
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './frontend'),

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Simple Express-React app',
            template: 'index.html',
        })
    ],

    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 9000
    },

};