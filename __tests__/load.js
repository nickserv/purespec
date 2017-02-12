const _ = require('lodash/fp')
const purespec = require('..')

describe('load()', () => {
  it('returns tests loaded from the given PureSpec module', () => {
    const actual = purespec.load('example.js')

    expect(actual).toBeInstanceOf(purespec.matchers.Test)
    expect(actual.name).toBe('Math.round()')
    expect(_.isFunction(actual.subject)).toBeTruthy()
    expect(actual.runnables).toEqual([
      new purespec.matchers.Given(1, new purespec.matchers.Returns(1)),
      new purespec.matchers.Given(1.5, new purespec.matchers.Returns(2))
    ])
  })
})