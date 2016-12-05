module.exports = {
  entry: ['babel-polyfill', './example'],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  },
  target: 'node'
}
