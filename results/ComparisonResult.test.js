const ComparisonResult = require('./ComparisonResult')
const Returns = require('../matchers/Returns')

describe('ComparisonResult', () => {
  const returns = new Returns(1)

  describe('.prototype.constructor()', () => {
    describe('given a matcher and equivalent actual and expected options', () => {
      it('returns ComparisonResult with matcher, actual, and expected', () => {
        const result = new ComparisonResult(returns, 1, 1)

        expect(result).toMatchObject({
          matcher: returns,
          actual: 1,
          expected: 1,
          error: undefined
        })
      })
    })

    describe('given a matcher and nonequivalent actual and expected options', () => {
      it('returns ComparisonResult with matcher, actual, expected, and an error', () => {
        const result = new ComparisonResult(returns, 2, 1)

        expect(result).toMatchObject({
          matcher: returns,
          actual: 2,
          expected: 1,
          error: new Error()
        })
      })
    })
  })
})
