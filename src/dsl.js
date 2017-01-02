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
    memo[matcher.toLowerCase()] = (arg1, arg2) => new Class(arg1, arg2)
    return memo
  }, {})
}

// Use function instead of arrow to support arguments
dsl.test = function (name, subject) {
  return new Test(name, subject, Array.from(arguments).slice(2))
}

module.exports = dsl
