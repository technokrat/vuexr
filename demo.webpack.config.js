const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: {
    main: './demo/src/main.ts',
    worker: './src/worker.js'
  },
  resolve:  {
    extensions: ['.ts', '.js', '.json', '.png'],
    fallback: {fs: false, path: false, crypto: false}
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './demo/dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, './demo/dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
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
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
};
