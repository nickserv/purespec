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
    Object.assign(target || global,
                  this.matchers,
                  this.withoutProperties(this, 'setup', 'withoutProperties', 'matcher'))
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

  withoutProperties (object) {
    var properties = Array.from(arguments).slice(1)
    return Object.keys(object).reduce((memo, key) => {
      if (properties.includes(key)) {
        return memo
      } else {
        return Object.assign({}, memo, { [key]: object[key] })
      }
    }, {})
  },

  matchers: {
    given (args, matcher) {
      return new Given(args, matcher)
    },

    returns (result) {
      return new Returns(result)
    },

    throws (exception) {
      return new Throws(exception)
    }
  }
}
