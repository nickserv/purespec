var assert = require('assert')

module.exports = {
  call (f, inState) {
    return f.call(f, ...inState)
  },

  given (inState, matcher) {
    return (f) => {
      matcher(f, inState)
    }
  },

  returns (outState) {
    return (f, inState) => {
      assert.deepStrictEqual(this.call(f, inState), outState)
    }
  },

  test (f, ...matchers) {
    matchers.forEach((matcher) => matcher(f))
  },

  throws (exception) {
    return (f, inState) => {
      assert.throws(() => this.call(f, inState), exception)
    }
  }
}
