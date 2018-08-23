const path = require('path')
const { resolve } = path
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// 使用 WEBPACK_SERVE 环境变量检测当前是否是在 webpack-server 启动的开发环境中
// const dev = Boolean(process.env.WEBPACK_SERVE)
// const commons = require('./commons')
const {
  NoEmitOnErrorsPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin
} = webpack

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
  devtool: 'eval',
  entry: {
    hotloader: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?https://localhost:8020',
      'webpack/hot/only-dev-server'
    ],
    // common: commons,
    bundle: ['babel-polyfill', resolve(__dirname, '../src/index.js')]
  },
  output: {
    path: resolve(__dirname, '../dev'),
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
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    enforceExtension: false,
    modules: [
      path.join(__dirname, '../src'),
      'node_modules',
      path.join(__dirname, '../libs')
    ]
  },
  devServer: {
    hot: true,
    disableHostCheck: true,
    // contentBase: path.resolve(__dirname, '../dev'),
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
    // new ExtractTextPlugin('style.css'),
    // enable HMR globally
    // new CommonsChunkPlugin({
    //   name: 'common',
    //   filename: 'common.js',
    //   minChunks: Infinity
    // }),
    new NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    // new UglifyJsPlugin({
    //   sourceMap: true
    // }),
    new webpack.ProvidePlugin({
      globalConfig: path.resolve(__dirname, '../config/debug'),
      React: 'react',
      ReactDOM: 'react-dom',
      _: 'lodash',
      PropTypes: 'prop-types',
      echarts: 'echarts'
    })
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('development')
    //   }
    // })
  ]
}
