var example = require('../example')

describe('example Test suite', () => {
  it('constructs a Test', () => {
    var expected = new purespec.Test(
      'Math.round()',
      Math.round,
      [
        new purespec.matchers.Given(1, new purespec.matchers.Returns(1)),
        new purespec.matchers.Given(1.5, new purespec.matchers.Returns(2))
      ]
    )

    assert.deepStrictEqual(example, expected)
  })

  it('has a string representation', () => {
    assert.strictEqual(example.toTree(), 'Math.round()\n  given 1\n    returns 1\n  given 1.5\n    returns 2')
  })
})
