const ComparisonResult = require('./ComparisonResult')
const NestedResult = require('./NestedResult.js')
const Returns = require('../matchers/Returns')
const Test = require('../matchers/Test')

const chalk = require('chalk')
chalk.enabled = true

describe('NestedResult', () => {
  const returns = new Returns(1)

  describe('.prototype.constructor()', () => {
    describe('given a runnable and passing results', () => {
      it('returns NestedResult with runnable, results, and a falsy error', () => {
        const results = [
          new ComparisonResult(returns, 1, 1)
        ]
        const result = new NestedResult(returns, results)

        expect(result).toMatchObject({
          runnable: returns,
          results: results,
          error: undefined
        })
      })
    })

    describe('given a runnable and failing results', () => {
      it('returns NestedResult with runnable, results, and a truthy error', () => {
        const results = [
          new ComparisonResult(returns, 2, 1)
        ]
        const result = new NestedResult(returns, results)

        expect(result).toMatchObject({
          runnable: returns,
          results: results,
          error: true
        })
      })
    })
  })

  describe('.prototype.toTree()', () => {
    describe('without results', () => {
      it('returns the result of .prototype.toString()', () => {
        const result = new NestedResult(returns)

        expect(result.toTree()).toBe(chalk.green('✓ returns 1'))
      })
    })

    describe('with results', () => {
      it('returns its String representation with the indented representations of its children', () => {
        const test = new Test(function test () {}, [returns])
        const result = new NestedResult(test, [new ComparisonResult(returns, 1, 1)])

        expect(result.toTree()).toBe(chalk`{green ✓ test}\n  {green ✓ returns 1}`)
      })
    })
  })
})
