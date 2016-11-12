var assert = require('assert')

module.exports = {
  setup (target) {
    Object.assign(target || global,
                  this.matchers,
                  this.withoutProperty(this, 'setup'))
  },

  test (subject) {
    return () => {
      var matchers = Array.from(arguments).slice(0, 1)
      matchers.forEach((matcher) => matcher(subject))
    }
  },

  withoutProperty (object, property) {
    return Object.keys(object).reduce((memo, key) => {
      if (key === property) {
        return memo
      } else {
        return Object.assign({}, memo, { [key]: object[key] })
      }
    }, {})
  },

  matchers: {
    given (args, matcher) {
      return (subject) => {
        matcher(subject.bind(subject, args))
      }
    },

    returns (result) {
      return (subject) => {
        assert.deepStrictEqual(subject(), result)
      }
    },

    throws (exception) {
      return (subject) => {
        assert.throws(subject, exception)
      }
    }
  }
}
