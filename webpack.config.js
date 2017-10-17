'use strict';

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
      'babel-polyfill',
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'src/app.jsx')
  ],
  resolve: {
    root: [
      path.resolve(__dirname, "src"),
    ],
    extensions: ['', '.js', '.jsx', '.css']
  },
  output: {
    path: path.join(__dirname, '/public/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  module: {
    loaders: [
    //     {
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     loader: 'babel',
    //     query:
    //         {
    //           presets:['es2015','react']
    //         }
    // },
        {
            test: /\.css$/,
            loader: 'style!css'
        },
        {
          test: /\.s[ac]ss$/,
            include: paths.appSrc,
            loaders: [
               require.resolve('style-loader'),
               require.resolve('css-loader'),
               require.resolve('sass-loader')
             ]
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel',
            query:
            {
              presets:['es2015','react', 'stage-0']
            },
            options: {
              cacheDirectory: true,
            },
          },
    ]
  }
};