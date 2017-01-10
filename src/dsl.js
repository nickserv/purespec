'use strict'
var matchers = require('./matchers')
var Test = require('./Test')

function dsl (target) {
  Object.assign(target === undefined ? global : target,
                dsl.matchers(),
                { test: dsl.test })
}

dsl.matchers = () => {
  return Object.keys(matchers).reduce((memo, matcher) => {
    var Class = matchers[matcher]
    memo[matcher.toLowerCase()] = (...args) => new Class(...args)
    return memo
  }, {})
}

dsl.test = (name, subject, ...runnables) => new Test(name, subject, runnables)

module.exports = dsl
