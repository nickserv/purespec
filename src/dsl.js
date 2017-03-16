const _ = require('lodash/fp')
const matchers = require('./matchers')

module.exports = _.flow(
  _.mapKeys(_.toLower),
  _.mapValues(Class => (...args) => new Class(...args))
)(matchers)
