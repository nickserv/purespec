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

  test (subject, ...matchers) {
    matchers.forEach((matcher) => matcher(subject))
  },

  throws (exception) {
    return (subject) => {
      assert.throws(() => subject(), exception)
    }
  }
}
