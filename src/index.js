const _ = require('lodash/fp')
const matchers = require('./matchers')

const dsl = _.flow(
  _.mapKeys(_.toLower),
  _.mapValues(Class => (...args) => new Class(...args))
)(matchers)

module.exports = {
  dsl,
  indent: require('./indent'),
  load: require('./load'),
  matchers,
  results: require('./results')
}
