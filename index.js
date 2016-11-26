'use strict'
var fs = require('fs')
var path = require('path')
var Test = require('./Test')

var MATCHERS_DIR = path.join(__dirname, 'matchers')

module.exports = {
  matchers: fs.readdirSync(MATCHERS_DIR).reduce((memo, file) => {
    return Object.assign({}, memo, {
      [path.basename(file, '.js')]: require(`${MATCHERS_DIR}/${file}`)
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
