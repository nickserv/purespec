'use strict'

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

  test (name, subject) {
    return () => {
      console.log(name)
      var matchers = Array.from(arguments).slice(2)
      var promises = matchers.map(matcher => {
        console.log(`  ${matcher}`)
        return matcher.match(subject)
      })
      return Promise.all(promises).catch(reason => {
        console.error(reason instanceof Error ? reason.message : reason)
        process.exit(1)
      })
    }
  }
}
