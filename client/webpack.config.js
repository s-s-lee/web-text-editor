const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    // bundle entry point
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // bundle output
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // webpack plugin to create HTML file and inject the bundle
      new HtmlWebpackPlugin({
        template:'./index.html',
        title: 'Web Text Editor'
      }),
      // inject our custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      // creating a manifest.json file
      new WebpackPwaManifest({
        // do I need to add any more here
        fingerprints: false,
        inject: true,
        name: 'Web Text Editor',
        short_name: 'TextEditor',
        description: 'The Craziest Web Text Editor You Can Find',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          // regex to search for css and then add to bundle
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          // regex to search for js to add to bundle
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
