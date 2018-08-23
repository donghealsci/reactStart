const path = require('path')
const webpack = require('webpack')
const mbase = require('./webpack.config.base.babel')
const merge = require('webpack-merge')
const commons = require('./commons')

const {
    NoEmitOnErrorsPlugin,
    HotModuleReplacementPlugin,
    NamedModulesPlugin
} = webpack

const {
    UglifyJsPlugin,
    CommonsChunkPlugin
} = webpack.optimize

module.exports = merge(mbase, {
  devtool: /* 'cheap-module-eval-source-map' */ 'eval',
  entry: {
    hotloader: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?https://localhost:8020',
      'webpack/hot/only-dev-server'
    ],
    common: commons,
    bundle: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dev'),
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
  devServer: {
    hot: true,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, '../dev'),
    https: true,
    historyApiFallback: true,
    // proxy https request to http server
    proxy: {
      '/setup/api/web/**': {
        target: 'https://service1dev.healscitech.com',
        secure: false,
        changeOrigin: true
      },
      '/utility/api/api_tickets': {
        tartget: 'https://service1dev.healscitech.com',
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new HotModuleReplacementPlugin(),
        // enable HMR globally
    new CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: Infinity
    }),
    new NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.ProvidePlugin({
      globalConfig: path.resolve(__dirname, '../config/debug')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
})
