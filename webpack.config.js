const path = require('path')
const webpack = require('webpack')
const BrowserSync = require('browser-sync-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './client/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new BrowserSync({
      host: 'localhost',
      port: 3001,
      proxy: 'http://localhost:3000'
    })
  ],
  module: {
    loaders: [
      { test: /\.jsx?/, loaders: ['babel'], include: path.join(__dirname, 'client') },
      { test: /\.css?/, loaders: ['style', 'css'] }
    ]
  }
}
