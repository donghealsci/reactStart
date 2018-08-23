const path = require('path')
const { resolve } = path
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
  LoaderOptionsPlugin,
  ProvidePlugin,
  HashedModuleIdsPlugin
} = webpack

let configPath = path.resolve(__dirname, '../config/dist-dev')

module.exports = {
  /*
  webpack 执行模式
  development：开发环境，它会在配置文件中插入调试相关的选项，比如 moduleId 使用文件路径方便调试
  production：生产环境，webpack 会将代码做压缩等优化
  */
  mode: 'development',
  /*
  配置 source map
  开发模式下使用 cheap-module-eval-source-map, 生成的 source map 能和源码每行对应，方便打断点调试
  生产模式下使用 hidden-source-map, 生成独立的 source map 文件，并且不在 js 文件中插入 source map 路径，用于在 error report 工具中查看 （比如 Sentry)
  */
  // devtool: 'hidden-source-map',
  entry: {
    bundle: ['babel-polyfill', resolve(__dirname, '../src/index.js')]
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['env', {modules: false}], 'react'],
            plugins: ['syntax-dynamic-import', ['import', { libraryName: 'antd', style: true }]]
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[hash:20].[ext]'
        }
      },
      {
        test: /\.less$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
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
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    enforceExtension: false,
    modules: [
      path.join(__dirname, '../src'),
      'node_modules',
      path.join(__dirname, '../libs')
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'style.[contenthash].css'
    // }),
    new LoaderOptionsPlugin({
      minimize: true
    }),
    new HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      title: '和兴健康科技用户管理系统',
      inject: true,
      filename: 'index.html',
      template: path.resolve(__dirname, '../indexTemplate.html')
    }),
    new ProvidePlugin({
      globalConfig: configPath,
      React: 'react',
      ReactDOM: 'react-dom',
      _: 'lodash',
      PropTypes: 'prop-types'
    })
  ]
}
