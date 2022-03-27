const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = [
  {
    mode: 'production',
    entry: {
      vuexr: './src/vuexr.ts',
    },
    resolve:  {
      extensions: ['.ts', '.js', '.json', '.png'],
    },
    externals: {
      vue: 'vue',
    },
    devtool: 'source-map',
    experiments: {
      outputModule: true,
    },
    output: {
      library: {
        // do not specify a `name` here
        type: 'module',
      },
      filename: '[name].js',
      path: path.resolve(__dirname, './dist'),
      environment: { module: true },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
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
      new VueLoaderPlugin(),
    ],
  },
  {
    mode: 'production',
    entry: {
      worker: './src/worker.js'
    },
    resolve:  {
      extensions: ['.ts', '.js', '.json'],
      fallback: {fs: false, path: false, crypto: false}
    },
    externals: {
      vue: 'vue',
    },
    devtool: 'source-map',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
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
      ]
    },
  },
];
