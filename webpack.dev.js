/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const PreactRefreshPlugin = require('@prefresh/webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.base')

const config = {
  entry: './src/client.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html'
    }),
    new PreactRefreshPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true
  }
}

module.exports = merge(baseConfig, config)
