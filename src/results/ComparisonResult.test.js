const ComparisonResult = require('./ComparisonResult')
const Returns = require('../matchers/Returns')

describe('ComparisonResult', () => {
  const returns = new Returns(1)

  describe('.prototype.constructor()', () => {
    describe('given a runnable and equivalent actual and expected options', () => {
      it('returns ComparisonResult with runnable, actual, expected, and a falsy error', () => {
        const result = new ComparisonResult(returns, 1, 1)

        expect(result).toMatchObject({
          runnable: returns,
          actual: 1,
          expected: 1,
          error: undefined
        })
      })
    })

    describe('given a runnable and nonequivalent actual and expected options', () => {
      it('returns ComparisonResult with runnable, actual, expected, and a truthy error', () => {
        const result = new ComparisonResult(returns, 2, 1)

        expect(result).toMatchObject({
          runnable: returns,
          actual: 2,
          expected: 1,
          error: true
        })
      })
    })
  })
})
