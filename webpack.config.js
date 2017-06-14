const path = require('path');
module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
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
          presets: ['env', 'react', 'stage-0']
        }
      },
      {
        test: /\.(jpg|png)$/,
        use:[
          {
            loader: 'file-loader',
            options:{
              name: '[name].[ext]',
              outputPath: 'img/',
              inputPath: 'img/'
            }
          }
        ]
      }
    ]
  }
};
