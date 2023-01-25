/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const baseConfig = require('./webpack.base')

const config = {
  entry: './src/client.js',
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist-ssr')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
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
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }]
    }),
    new CompressionPlugin(),
    new StatsWriterPlugin({
      // filename: 'stats.json',
      stats: {
        all: false,
        assets: true
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash].css'
    })
  ]
}

module.exports = merge(baseConfig, config)
