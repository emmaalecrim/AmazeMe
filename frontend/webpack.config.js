//jshint esversion:6
const webpack = require('webpack');
const path = require('path');


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
        compress: true,
        port: 8080,
        contentBase: path.resolve(__dirname, "./dist")
        
    }
};