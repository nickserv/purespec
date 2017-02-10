var example = require('../example')
var purespec = require('..')

describe('example Test suite', function () {
  it('constructs a Test', function () {
    var expected = new purespec.Test(
      'Math.round()',
      Math.round,
      [
        new purespec.matchers.Given(1, new purespec.matchers.Returns(1)),
        new purespec.matchers.Given(1.5, new purespec.matchers.Returns(2))
      ]
    )

    expect(example).toEqual(expected)
  })

  it('has a string representation', function () {
    expect(example.toTree()).toBe('Math.round()\n  given 1\n    returns 1\n  given 1.5\n    returns 2')
  })
})
