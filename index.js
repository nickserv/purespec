var assert = require('assert')

module.exports = {
  given (inState, matcher) {
    return (f) => {
      matcher(f.bind(f, inState))
    }
  },

  returns (outState) {
    return (f) => {
      assert.deepStrictEqual(f(), outState)
    }
  },

  test (f, ...matchers) {
    matchers.forEach((matcher) => matcher(f))
  },

  throws (exception) {
    return (f) => {
      assert.throws(() => f(), exception)
    }
  }
}
