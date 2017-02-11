var _ = require('lodash/fp')
var fs = require('fs')
var path = require('path')

var matchers = _.flow(
  _.map(file => path.basename(file, '.js')),
  _.without(['index'])
)(fs.readdirSync(__dirname))

module.exports = _.flow(
  _.map(matcher => require(`./${matcher}`)),
  _.zipObject(matchers)
)(matchers)
