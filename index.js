'use strict'

module.exports = {
  matchers: {
    Given: require('./matchers/Given'),
    Returns: require('./matchers/Returns'),
    Throws: require('./matchers/Throws')
  },

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

  test (name, subject) {
    return () => {
      console.log(name)
      var matchers = Array.from(arguments).slice(2)
      matchers.forEach(matcher => {
        console.log(`  ${matcher}`)
        matcher.match(subject)
      })
    }
  }
}
