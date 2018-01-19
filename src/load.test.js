const _ = require('lodash/fp')
const Given = require('./matchers/Given')
const Returns = require('./matchers/Returns')
const Test = require('./matchers/Test')
const load = require('./load')

describe('load()', () => {
  it('returns tests loaded from the given PureSpec module', () => {
    const actual = load('examples/round.js')

    expect(actual).toBeInstanceOf(Test)
    expect(_.isFunction(actual.subject)).toBeTruthy()
    expect(actual.runnables).toEqual([
      new Given(1, new Returns(1)),
      new Given(1.5, new Returns(2))
    ])
  })
})
