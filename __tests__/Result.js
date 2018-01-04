const purespec = require('..')

const chalk = require('chalk')
chalk.enabled = true

describe('Result', () => {
  const returns = new purespec.matchers.Returns(1)

  describe('.prototype.constructor()', () => {
    describe('given a runnable', () => {
      it('returns Result with runnable and no error', () => {
        const result = new purespec.Result(returns)

        expect(result).toMatchObject({
          runnable: returns,
          error: undefined
        })
      })
    })

    describe('given a runnable and an error', () => {
      it('returns Result with runnable and error', () => {
        const error = new Error()
        const result = new purespec.Result(returns, error)

        expect(result).toMatchObject({
          runnable: returns,
          error
        })
      })
    })
  })

  describe('.prototype.toString()', () => {
    describe('when there is an error', () => {
      it('returns a red String with a cross, its runnable, a newline, and its error', () => {
        const result = new purespec.Result(returns, true)

        expect(result.toString()).toBe(chalk`{red ✗ returns 1}\ntrue`)
      })
    })

    describe('when there is no error', () => {
      it('returns a green String with a check and its runnable', () => {
        const result = new purespec.Result(returns)

        expect(result.toString()).toBe(chalk.green('✓ returns 1'))
      })
    })
  })

  describe('.prototype.toTree()', () => {
    it('returns the result of .prototype.toString()', () => {
      const result = new purespec.Result(returns)

      expect(result.toTree()).toBe(chalk.green('✓ returns 1'))
    })
  })
})
