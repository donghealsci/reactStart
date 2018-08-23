const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

const {
    ProvidePlugin,
    DefinePlugin
} = webpack

const {
    CommonsChunkPlugin
} = webpack.optimize

module.exports = {
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
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
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: [{
        //     loader: 'css-loader'
        //   },
        //   {
        //     loader: 'less-loader',
        //     options: {
        //       sourceMap: true
        //     }
        //   }
        //   ],
        //   publicPath: '/'
        // })
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
  plugins: [
    new ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      _: 'lodash',
      PropTypes: 'prop-types'
    })
  ]
}
