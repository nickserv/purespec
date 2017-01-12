var chalk = require('chalk')
chalk.enabled = true

describe('Result', () => {
  var runnable = new purespec.matchers.Returns(1)

  describe('.prototype.constructor()', () => {
    context('given a runnable', () => {
      var result = new purespec.Result(runnable)

      it('returns Result with runnable, empty results, and a falsy error', () => {
        expect(result.runnable).to.equal(runnable)
        expect(result.results).to.be.empty
        expect(result.error).to.be.false
      })
    })

    context('given a runnable and passing results', () => {
      var results = [
        new purespec.Result(runnable, {
          actual: 1,
          expected: 1
        })
      ]
      var result = new purespec.Result(runnable, { results })

      it('returns Result with runnable, results, and a falsy error', () => {
        expect(result.runnable).to.equal(runnable)
        expect(result.results).to.deep.equal(results)
        expect(result.error).to.be.false
      })
    })

    context('given a runnable and failing results', () => {
      var results = [
        new purespec.Result(runnable, {
          actual: 2,
          expected: 1
        })
      ]
      var result = new purespec.Result(runnable, { results })

      it('returns Result with runnable, results, and a truthy error', () => {
        expect(result.runnable).to.equal(runnable)
        expect(result.results).to.deep.equal(results)
        expect(result.error).to.be.true
      })
    })

    context('given a runnable and an error', () => {
      var error = new Error()
      var result = new purespec.Result(runnable, { error })

      it('returns Result with runnable, empty results, and error', () => {
        expect(result.runnable).to.equal(runnable)
        expect(result.results).to.be.empty
        expect(result.error).to.equal(error)
      })
    })

    context('given a runnable and equivalent actual and expected options', () => {
      var result = new purespec.Result(runnable, {
        actual: 1,
        expected: 1
      })

      it('returns Result with runnable, actual, expected, and a falsy error', () => {
        expect(result.runnable).to.equal(runnable)
        expect(result.actual).to.equal(1)
        expect(result.expected).to.equal(1)
        expect(result.error).to.be.false
      })
    })

    context('given a runnable and nonequivalent actual and expected options', () => {
      var result = new purespec.Result(runnable, {
        actual: 2,
        expected: 1
      })

      it('returns Result with runnable, actual, expected, and a truthy error', () => {
        expect(result.runnable).to.equal(runnable)
        expect(result.actual).to.equal(2)
        expect(result.expected).to.equal(1)
        expect(result.error).to.be.true
      })
    })
  })

  describe('.prototype.toString()', () => {
    context('when there is an error', () => {
      var result = new purespec.Result(runnable, {
        actual: 2,
        expected: 1
      })

      it('returns a red String with a cross, its runnable, a newline, and its error', () => {
        expect(result.toString()).to.equal(`${chalk.red('✗ returns 1')}\ntrue`)
      })
    })

    context('when there is no error', () => {
      var result = new purespec.Result(runnable, {
        actual: 1,
        expected: 1
      })

      it('returns a green String with a check and its runnable', () => {
        expect(result.toString()).to.equal(chalk.green('✓ returns 1'))
      })
    })
  })

  describe('.prototype.toTree()', () => {
    context('without results', () => {
      var result = new purespec.Result(runnable, {
        actual: 1,
        expected: 1
      })

      it('returns the result of .prototype.toString()', () => {
        expect(result.toTree()).to.equal(chalk.green('✓ returns 1'))
      })
    })

    context('with results', () => {
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
        expect(result.toTree()).equal(`${chalk.green('✓ test')}\n  ${chalk.green('✓ returns 1')}`)
      })
    })
  })
})
