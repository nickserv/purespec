var chalk = require('chalk')
chalk.enabled = true

describe('Result', () => {
  var runnable = new purespec.matchers.Returns(1)

  describe('.prototype.constructor()', () => {
    describe('given a runnable', () => {
      var result = new purespec.Result(runnable)

      it('returns Result with runnable, empty results, and a falsy error', () => {
        assert.strictEqual(result.runnable, runnable)
        assert.deepStrictEqual(result.results, [])
        assert.strictEqual(result.error, false)
      })
    })

    describe('given a runnable and passing results', () => {
      var results = [
        new purespec.Result(runnable, {
          actual: 1,
          expected: 1
        })
      ]
      var result = new purespec.Result(runnable, { results })

      it('returns Result with runnable, results, and a falsy error', () => {
        assert.strictEqual(result.runnable, runnable)
        assert.deepStrictEqual(result.results, results)
        assert.strictEqual(result.error, false)
      })
    })

    describe('given a runnable and failing results', () => {
      var results = [
        new purespec.Result(runnable, {
          actual: 2,
          expected: 1
        })
      ]
      var result = new purespec.Result(runnable, { results })

      it('returns Result with runnable, results, and a truthy error', () => {
        assert.strictEqual(result.runnable, runnable)
        assert.deepStrictEqual(result.results, results)
        assert.strictEqual(result.error, true)
      })
    })

    describe('given a runnable and an error', () => {
      var error = new Error()
      var result = new purespec.Result(runnable, { error })

      it('returns Result with runnable, empty results, and error', () => {
        assert.strictEqual(result.runnable, runnable)
        assert.deepStrictEqual(result.results, [])
        assert.strictEqual(result.error, error)
      })
    })

    describe('given a runnable and equivalent actual and expected options', () => {
      var result = new purespec.Result(runnable, {
        actual: 1,
        expected: 1
      })

      it('returns Result with runnable, actual, expected, and a falsy error', () => {
        assert.strictEqual(result.runnable, runnable)
        assert.strictEqual(result.actual, 1)
        assert.strictEqual(result.expected, 1)
        assert.strictEqual(result.error, false)
      })
    })

    describe('given a runnable and nonequivalent actual and expected options', () => {
      var result = new purespec.Result(runnable, {
        actual: 2,
        expected: 1
      })

      it('returns Result with runnable, actual, expected, and a truthy error', () => {
        assert.strictEqual(result.runnable, runnable)
        assert.strictEqual(result.actual, 2)
        assert.strictEqual(result.expected, 1)
        assert.strictEqual(result.error, true)
      })
    })
  })

  describe('.prototype.toString()', () => {
    describe('when there is an error', () => {
      var result = new purespec.Result(runnable, {
        actual: 2,
        expected: 1
      })

      it('returns a red String with a cross, its runnable, a newline, and its error', () => {
        assert.strictEqual(result.toString(), `${chalk.red('✗ returns 1')}\ntrue`)
      })
    })

    describe('when there is no error', () => {
      var result = new purespec.Result(runnable, {
        actual: 1,
        expected: 1
      })

      it('returns a green String with a check and its runnable', () => {
        assert.strictEqual(result.toString(), chalk.green('✓ returns 1'))
      })
    })
  })

  describe('.prototype.toTree()', () => {
    describe('without results', () => {
      var result = new purespec.Result(runnable, {
        actual: 1,
        expected: 1
      })

      it('returns the result of .prototype.toString()', () => {
        assert.strictEqual(result.toTree(), chalk.green('✓ returns 1'))
      })
    })

    describe('with results', () => {
      var test = new purespec.Test('test', () => {}, [runnable])
      var result = new purespec.Result(test, {
        results: [
          new purespec.Result(runnable, {
            actual: 1,
            expected: 1
          })
        ]
      })

      it('returns its String representation with the indented representations of its children', () => {
        assert.strictEqual(result.toTree(), `${chalk.green('✓ test')}\n  ${chalk.green('✓ returns 1')}`)
      })
    })
  })
})
