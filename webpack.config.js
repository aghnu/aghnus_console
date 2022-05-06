const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'assets/js/'),
    },
    watch: true,
  };