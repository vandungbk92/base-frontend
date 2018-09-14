const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    /*new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),*/
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'index.html',
      favicon: 'favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css'),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.jsx$|\.css$|\.html$|\.jpg$|\.png$|\.gif$|\.ico$|\.eot?.+$|\.otf?.+$|\.ttf?.+$|\.woff?.+$|\.woff2?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3001',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'babel-polyfill', './src/index.js'],
  /*entry: {
    app: './src/index.js'
  },*/
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-2'],
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: '/node_modules/',
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve('./src'),
                  path.resolve('./node_modules')
                ],
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(jpg|png|gif|ico|woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader?limit=100000'
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  }
};