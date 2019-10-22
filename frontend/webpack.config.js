//jshint esversion:6
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',

    output: {
        filename: 'project.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
          {
            test: [ /\.vert$/, /\.frag$/ ],
            use: 'raw-loader',
          },
        ],
      },
    
    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ],

    devServer: {
        host: '0.0.0.0',
        compress: true,
        port: 8080,
        publicPath: '/dist/',
        contentBase: path.resolve(__dirname, "./views")
        
    }
};