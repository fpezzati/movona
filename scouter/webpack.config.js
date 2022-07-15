const path = require('path');
module.exports = {
  entry: './src/scouter.js',
  devtool: 'eval-source-map',
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
    }, {
      test: /\.js$/,
      enforce: "pre",
      use: ["source-map-loader"]
    }]
  },
  output: {
    library: {
      name: 'scouter',
      type: 'umd'
    },
    globalObject: 'this',
    filename: 'scouter.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    'eventshandler': {
      commonjs: 'eventshandler',
      commonjs2: 'eventshandler',
      umd: 'eventshandler'
    },
    'geojson-validation': {
      commonjs: 'geojson-validation',
      commonjs2: 'geojson-validation',
      umd: 'geojson-validation'
    },
    'uuid': {
      commonjs: 'uuid',
      commonjs2: 'uuid',
      umd: 'uuid'
    }
  }
};
