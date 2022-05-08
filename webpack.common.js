const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'site/'),
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: "Aghnu's Console | Gengyuan Huang's Website",
        filename: 'index.html'
      })
    ],

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
  };