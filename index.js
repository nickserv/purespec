var assert = require('assert')

module.exports = {
  assert (f, inState, outState) {
    assert.deepStrictEqual(this.call(f, inState), outState)
  },

  assertMany (f, map) {
    map.forEach((outState, inState) => this.assert(f, inState, outState))
  },

  call (f, inState) {
    try {
      return { return: f.call(f, ...inState) }
    } catch (exception) {
      return { exception }
    }
  }
}
