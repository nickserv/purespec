var _ = require('lodash/fp')
var matchers = require('./matchers')
var Test = require('./Test')

function dsl (target) {
  return Object.assign(_.defaultTo(global)(target), dsl.functions)
}

dsl.functions = _.flow(
  _.mapKeys(_.toLower),
  _.mapValues(Class => (...args) => new Class(...args)),
  _.assign({
    test: (name, subject, ...runnables) => new Test(name, subject, runnables)
  })
)(matchers)

module.exports = dsl
