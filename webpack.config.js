module.exports = {
  entry: './example',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'strict'
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  },
  target: 'node'
}
