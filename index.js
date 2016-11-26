'use strict'
var Test = require('./Test')

module.exports = {
  matchers: require('./matchers'),

  setup (target) {
    var matchers = Object.keys(this.matchers).reduce((memo, matcher) => {
      var Class = this.matchers[matcher]
      memo[matcher.toLowerCase()] = (arg1, arg2) => new Class(arg1, arg2)
      return memo
    }, {})
    Object.assign(target || global, matchers, { test: this.test })
  },

  Test,

  test (name, subject) {
    return new Test(name, subject, Array.from(arguments).slice(2))
  }
}
