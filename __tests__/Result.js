const purespec = require('..')

const chalk = require('chalk')
chalk.enabled = true

describe('Result', () => {
  const returns = new purespec.matchers.Returns(1)

  describe('.prototype.constructor()', () => {
    describe('given a runnable', () => {
      it('returns Result with runnable, empty results, and a falsy error', () => {
        const result = new purespec.Result(returns)

        expect(result).toMatchObject({
          runnable: returns,
          results: [],
          error: false
        })
      })
    })

    describe('given a runnable and passing results', () => {
      it('returns Result with runnable, results, and a falsy error', () => {
        const results = [
          new purespec.Result(returns, {
            actual: 1,
            expected: 1
          })
        ]
        const result = new purespec.Result(returns, { results: results })

        expect(result).toMatchObject({
          runnable: returns,
          results: results,
          error: false
        })
      })
    })

    describe('given a runnable and failing results', () => {
      it('returns Result with runnable, results, and a truthy error', () => {
        const results = [
          new purespec.Result(returns, {
            actual: 2,
            expected: 1
          })
        ]
        const result = new purespec.Result(returns, { results: results })

        expect(result).toMatchObject({
          runnable: returns,
          results: results,
          error: true
        })
      })
    })

    describe('given a runnable and an error', () => {
      it('returns Result with runnable, empty results, and error', () => {
        const error = new Error()
        const result = new purespec.Result(returns, { error })

        expect(result).toMatchObject({
          runnable: returns,
          results: [],
          error
        })
      })
    })

    describe('given a runnable and equivalent actual and expected options', () => {
      it('returns Result with runnable, actual, expected, and a falsy error', () => {
        const result = new purespec.Result(returns, {
          actual: 1,
          expected: 1
        })

        expect(result).toMatchObject({
          runnable: returns,
          actual: 1,
          expected: 1,
          error: false
        })
      })
    })

    describe('given a runnable and nonequivalent actual and expected options', () => {
      it('returns Result with runnable, actual, expected, and a truthy error', () => {
        const result = new purespec.Result(returns, {
          actual: 2,
          expected: 1
        })

        expect(result).toMatchObject({
          runnable: returns,
          actual: 2,
          expected: 1,
          error: true
        })
      })
    })
  })

  describe('.prototype.toString()', () => {
    describe('when there is an error', () => {
      it('returns a red String with a cross, its runnable, a newline, and its error', () => {
        const result = new purespec.Result(returns, {
          actual: 2,
          expected: 1
        })

        expect(result.toString()).toBe(`${chalk.red('✗ returns 1')}\ntrue`)
      })
    })

    describe('when there is no error', () => {
      it('returns a green String with a check and its runnable', () => {
        const result = new purespec.Result(returns, {
          actual: 1,
          expected: 1
        })

        expect(result.toString()).toBe(chalk.green('✓ returns 1'))
      })
    })
  })

  describe('.prototype.toTree()', () => {
    describe('without results', () => {
      it('returns the result of .prototype.toString()', () => {
        const result = new purespec.Result(returns, {
          actual: 1,
          expected: 1
        })

        expect(result.toTree()).toBe(chalk.green('✓ returns 1'))
      })
    })

    describe('with results', () => {
      it('returns its String representation with the indented representations of its children', () => {
        const test = new purespec.matchers.Test('test', () => {}, [returns])
        const result = new purespec.Result(test, {
          results: [
            new purespec.Result(returns, {
              actual: 1,
              expected: 1
            })
          ]
        })

        expect(result.toTree()).toBe(`${chalk.green('✓ test')}\n  ${chalk.green('✓ returns 1')}`)
      })
    })
  })
})
