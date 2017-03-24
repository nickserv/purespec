const _ = require('lodash/fp')
const fs = require('fs')
const path = require('path')

const matchers = _.flow(
  _.map(file => path.basename(file, '.js')),
  _.without(['index'])
)(fs.readdirSync(__dirname))

module.exports = _.flow(
  _.map(matcher => require(`./${matcher}`)),
  _.zipObject(_.map(_.startCase)(matchers))
)(matchers)
