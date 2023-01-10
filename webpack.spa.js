/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.base')

const config = {
  entry: './index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
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
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html'
    })
  ]
}

module.exports = merge(baseConfig, config)
