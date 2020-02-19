const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    vuexr: './src/vuexr.js',
    worker: './src/Vision/worker.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|vendor)/,
        use: {
          loader: 'babel-loader',
        }
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  plugins: [
    //new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyPlugin([
      { from: './vendor/opencv_js.wasm', to: './opencv_js.wasm' },
    ]),
  ]
};
