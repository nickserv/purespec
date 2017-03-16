var _ = require('lodash/fp')
var purespec = require('..')

describe('load()', () => {
  it('returns tests loaded from the given PureSpec module', () => {
    var actual = purespec.load('example.js')

    expect(actual).toBeInstanceOf(purespec.matchers.Test)
    expect(_.isFunction(actual.subject)).toBeTruthy()

    expect(actual).toMatchObject({
      name: 'Math.round()',
      runnables: [
        new purespec.matchers.Given(1, new purespec.matchers.Returns(1)),
        new purespec.matchers.Given(1.5, new purespec.matchers.Returns(2))
      ]
    })
  })
})
