var _ = require('lodash/fp')
var matchers = require('./matchers')
var Test = require('./Test')

module.exports = _.flow(
  _.mapKeys(_.toLower),
  _.mapValues(Class => (...args) => new Class(...args)),
  _.assign({
    test: (name, subject, ...runnables) => new Test(name, subject, runnables)
  })
)(matchers)
