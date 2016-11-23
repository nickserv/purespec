'use strict'
var Test = require('./Test')

module.exports = {
  matchers: ['Given', 'Rejects', 'Resolves', 'Returns', 'Throws'].reduce((memo, className) => {
    return Object.assign({}, memo, {
      [className]: require(`./matchers/${className}`)
    })
  }, {}),

  setup (target) {
    var matchers = Object.keys(this.matchers).reduce((memo, key) => {
      var MatcherClass = this.matchers[key]
      return Object.assign({}, memo, {
        [key.toLowerCase()]: (arg1, arg2) => new MatcherClass(arg1, arg2)
      })
    }, {})
    Object.assign(target || global,
                  matchers,
                  { test: this.test })
  },

  Test,

  test (name, subject) {
    var runnables = Array.from(arguments).slice(2)
    return new Test(name, subject, runnables)
  }
}
