const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.config.base.babel')
const merge = require('webpack-merge')
const commons = require('./commons')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const {
    LoaderOptionsPlugin
} = webpack

const {
    UglifyJsPlugin,
    CommonsChunkPlugin
} = webpack.optimize

let configPath = path.resolve(__dirname, '../config/dist-prod')

let target = process.env.NODE_ENV
console.log('distribute to enviroment ', target)

if (target === 'dev') {
  configPath = path.resolve(__dirname, '../config/dist-dev')
} else if (target === 'test') {
  configPath = path.resolve(__dirname, '../config/dist-test')
}

module.exports = merge(base, {
  entry: {
    common: commons,
    bundle: path.resolve(__dirname, '../src/index')
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/setup/'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:10]'}
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '../src')]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]__[local]__[hash:base64:10]'}
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '../src')]
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: 'warning', // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function (assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.[contenthash].css'
    }),
    new UglifyJsPlugin(),
    new LoaderOptionsPlugin({
      minimize: true
    }),
    new CommonsChunkPlugin({
      names: ['common', 'manifest'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: '和兴健康科技用户管理系统',
      inject: true,
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../indexTemplate.html')
    }),
    new webpack.ProvidePlugin({
      globalConfig: configPath
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
})
