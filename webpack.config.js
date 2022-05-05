const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'assets/js/'),
    },
  };