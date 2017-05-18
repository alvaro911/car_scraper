const path = require('path');
module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'app.js',
    publicPath: '/'
  },
  devServer:{
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
