const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './build',
    publicPath: '/',
    hot: true
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },
  plugins: [
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
          loader: 'babel-loader',
        }
      }, {
        test: /\.(ttf|otf|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
        },
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