module.exports = {
  entry: './example',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'strict'
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  },
  target: 'node'
}
