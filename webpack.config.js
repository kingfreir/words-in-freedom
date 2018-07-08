const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './build',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  }
}