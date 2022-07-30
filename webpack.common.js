const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// get liquid template data
const getTemplateData = (resourcePath) => {
  const data = {
    'news': require('./src/data/news.json'),
    'projects': require('./src/data/projects.json'),
    'sitemap': require('./src/data/sitemap.json')
  }

  return data;
}


module.exports = {
  entry: './src/js/main.js',

  module: {
    rules: [


      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },


      {
        test: /\.liquid$/,
        use: [{
            loader: "html-loader",
          },
          {
            loader: "liquid-loader",
            options: {
              data: getTemplateData,
            },
          },
        ],
      },


    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};