var purespec = require('..')

var chalk = require('chalk')
chalk.enabled = true

describe('Result', function () {
  beforeEach(function () {
    this.returns = new purespec.matchers.Returns(1)
  })

  describe('.prototype.constructor()', function () {
    describe('given a runnable', function () {
      beforeEach(function () {
        this.result = new purespec.Result(this.returns)
      })

      it('returns Result with runnable, empty results, and a falsy error', function () {
        expect(this.result).toMatchObject({
          runnable: this.returns,
          results: [],
          error: false
        })
      })
    })

    describe('given a runnable and passing results', function () {
      beforeEach(function () {
        this.results = [
          new purespec.Result(this.returns, {
            actual: 1,
            expected: 1
          })
        ]
        this.result = new purespec.Result(this.returns, { results: this.results })
      })

      it('returns Result with runnable, results, and a falsy error', function () {
        expect(this.result).toMatchObject({
          runnable: this.returns,
          results: this.results,
          error: false
        })
      })
    })

    describe('given a runnable and failing results', function () {
      beforeEach(function () {
        this.results = [
          new purespec.Result(this.returns, {
            actual: 2,
            expected: 1
          })
        ]
        this.result = new purespec.Result(this.returns, { results: this.results })
      })

      it('returns Result with runnable, results, and a truthy error', function () {
        expect(this.result).toMatchObject({
          runnable: this.returns,
          results: this.results,
          error: true
        })
      })
    })

    describe('given a runnable and an error', function () {
      beforeEach(function () {
        this.error = new Error()
        this.result = new purespec.Result(this.returns, { error: this.error })
      })

      it('returns Result with runnable, empty results, and error', function () {
        expect(this.result).toMatchObject({
          runnable: this.returns,
          results: [],
          error: this.error
        })
      })
    })

    describe('given a runnable and equivalent actual and expected options', function () {
      beforeEach(function () {
        this.result = new purespec.Result(this.returns, {
          actual: 1,
          expected: 1
        })
      })

      it('returns Result with runnable, actual, expected, and a falsy error', function () {
        expect(this.result).toMatchObject({
          runnable: this.returns,
          actual: 1,
          expected: 1,
          error: false
        })
      })
    })

    describe('given a runnable and nonequivalent actual and expected options', function () {
      beforeEach(function () {
        this.result = new purespec.Result(this.returns, {
          actual: 2,
          expected: 1
        })
      })

      it('returns Result with runnable, actual, expected, and a truthy error', function () {
        expect(this.result).toMatchObject({
          runnable: this.returns,
          actual: 2,
          expected: 1,
          error: true
        })
      })
    })
  })

  describe('.prototype.toString()', function () {
    describe('when there is an error', function () {
      beforeEach(function () {
        this.result = new purespec.Result(this.returns, {
          actual: 2,
          expected: 1
        })
      })

      it('returns a red String with a cross, its runnable, a newline, and its error', function () {
        expect(this.result.toString()).toBe(`${chalk.red('✗ returns 1')}\ntrue`)
      })
    })

    describe('when there is no error', function () {
      beforeEach(function () {
        this.result = new purespec.Result(this.returns, {
          actual: 1,
          expected: 1
        })
      })

      it('returns a green String with a check and its runnable', function () {
        expect(this.result.toString()).toBe(chalk.green('✓ returns 1'))
      })
    })
  })

  describe('.prototype.toTree()', function () {
    describe('without results', function () {
      beforeEach(function () {
        this.result = new purespec.Result(this.returns, {
          actual: 1,
          expected: 1
        })
      })

      it('returns the result of .prototype.toString()', function () {
        expect(this.result.toTree()).toBe(chalk.green('✓ returns 1'))
      })
    })

    describe('with results', function () {
      beforeEach(function () {
        this.test = new purespec.Test('test', function () {}, [this.returns])
        this.result = new purespec.Result(this.test, {
          results: [
            new purespec.Result(this.returns, {
              actual: 1,
              expected: 1
            })
          ]
        })
      })

      it('returns its String representation with the indented representations of its children', function () {
        expect(this.result.toTree()).toBe(`${chalk.green('✓ test')}\n  ${chalk.green('✓ returns 1')}`)
      })
    })
  })
})
