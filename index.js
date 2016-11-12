var assert = require('assert')

module.exports = {
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

  test (subject) {
    var matchers = Array.from(arguments).slice(0, 1)
    matchers.forEach((matcher) => matcher(subject))
  },

  throws (exception) {
    return (subject) => {
      assert.throws(subject, exception)
    }
  }
}
