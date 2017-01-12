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

    expect(example).to.deep.equal(expected)
  })

  it('has a string representation', () => {
    expect(example.toTree()).to.equal('Math.round()\n  given 1\n    returns 1\n  given 1.5\n    returns 2')
  })
})
