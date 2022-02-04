const path = require('path');
module.exports = {
  entry: './src/eventshandler.js',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /\/node_modules\//,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        }
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  output: {
    library: {
      name: 'eventshandler',
      type: 'umd'
    },
    globalObject: 'this',
    filename: 'eventshandler.js',
    path: path.resolve(__dirname, 'dist')
  }
};
