var assert = require('assert')

module.exports = {
  setup (target) {
    Object.assign(target || global, this.matchers, this)
  },

  test (subject) {
    var matchers = Array.from(arguments).slice(0, 1)
    matchers.forEach((matcher) => matcher(subject))
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
