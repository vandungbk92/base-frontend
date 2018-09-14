const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: '3001',
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
});