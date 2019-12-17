const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './demo/src/index.js',
  output: {
    filename: 'index_bundle.js',
    path: path.resolve(__dirname, './demo/dist'),
  },
  node: {
    fs: 'empty'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './demo/dist'),
    compress: true,
    port: 9000
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
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
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
      }
    ]
  },
  plugins: [
    //new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ]
};
