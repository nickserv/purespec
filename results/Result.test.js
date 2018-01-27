const Result = require('./Result')
const Returns = require('../matchers/Returns')

const chalk = require('chalk')
chalk.enabled = true

describe('Result', () => {
  const returns = new Returns(1)

  describe('.prototype.constructor()', () => {
    describe('given a matcher', () => {
      it('returns Result with matcher and no error', () => {
        const result = new Result(returns)

        expect(result).toMatchObject({
          matcher: returns,
          error: undefined
        })
      })
    })

    describe('given a matcher and an error', () => {
      it('returns Result with matcher and error', () => {
        const error = new Error()
        const result = new Result(returns, error)

        expect(result).toMatchObject({
          matcher: returns,
          error
        })
      })
    })
  })

  describe('.prototype.toString()', () => {
    describe('when there is an error', () => {
      it('returns a red String with a cross, its matcher, a newline, and its error', () => {
        const result = new Result(returns, new Error())

        expect(result.toString()).toBe(chalk`{red ✗ returns 1}\nError`)
      })
    })

    describe('when there is no error', () => {
      it('returns a green String with a check and its matcher', () => {
        const result = new Result(returns)

        expect(result.toString()).toBe(chalk.green('✓ returns 1'))
      })
    })
  })

  describe('.prototype.toTree()', () => {
    it('returns the result of .prototype.toString()', () => {
      const result = new Result(returns)

      expect(result.toTree()).toBe(chalk.green('✓ returns 1'))
    })
  })
})
