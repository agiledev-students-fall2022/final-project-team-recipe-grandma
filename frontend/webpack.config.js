const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const webpack = require('webpack');
const { merge } = require('webpack-merge');

const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`);

module.exports = ({ mode } = { mode: 'production' }) => {
  console.log(`mode is: ${mode}`);

  return merge(
    {
      mode,
      entry: './src/index.js',
      stats: 'errors-warnings',
      devServer: {
        hot: true,
        open: true,
      },
      output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.scss/,
            use: [
              MiniCssExtractPlugin.loader,
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  module: true,
                },
              },
              'sass-loader',
            ],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
              },
            },
          },
          {
            test: /\.jpe?g|png$/,
            exclude: /node_modules/,
            use: ['url-loader', 'file-loader'],
          },
          {
            test: /\.css$/i,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              'postcss-loader',
            ],
          },
        ],
      },
      plugins: [
        new ESLintPlugin(),
        new MiniCssExtractPlugin(),
        new HTMLWebpackPlugin({
          template: './public/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
    },
    modeConfiguration(mode),
  );
};
