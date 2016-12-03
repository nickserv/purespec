'use strict'
var matchers = require('./matchers')
var Test = require('./Test')

module.exports = {
  setup (target) {
    var matcherDSL = Object.keys(matchers).reduce((memo, matcher) => {
      var Class = matchers[matcher]
      memo[matcher.toLowerCase()] = (arg1, arg2) => new Class(arg1, arg2)
      return memo
    }, {})
    Object.assign(target || global, matcherDSL, { test: this.test })
  },

  test (name, subject) {
    return new Test(name, subject, Array.from(arguments).slice(2))
  }
}
