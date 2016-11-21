'use strict'
var assert = require('assert')

class Given {
  constructor (args, matcher) {
    this.args = args
    this.matcher = matcher
  }

  match (subject) {
    this.matcher.match(() => subject.apply(null, this.args))
  }

  toString () {
    return `given ${this.args} ${this.matcher}`
  }
}

class Returns {
  constructor (result) {
    this.result = result
  }

  match (subject) {
    assert.deepStrictEqual(subject(), this.result)
  }

  toString () {
    return `returns ${this.result}`
  }
}

class Throws {
  constructor (exception) {
    this.exception = exception
  }

  match (subject) {
    assert.throws(subject, this.exception)
  }

  toString () {
    return `throws ${this.exception}`
  }
}

module.exports = {
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
  },

  matchers: { Given, Returns, Throws }
}
