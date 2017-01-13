var chalk = require('chalk')
chalk.enabled = true

describe('Result', function () {
  before(function () {
    this.returns = new purespec.matchers.Returns(1)
  })

  describe('.prototype.constructor()', function () {
    context('given a runnable', function () {
      before(function () {
        this.result = new purespec.Result(this.returns)
      })

      it('returns Result with runnable, empty results, and a falsy error', function () {
        expect(this.result.runnable).to.equal(this.returns)
        expect(this.result.results).to.be.empty
        expect(this.result.error).to.be.false
      })
    })

    context('given a runnable and passing results', function () {
      before(function () {
        this.results = [
          new purespec.Result(this.returns, {
            actual: 1,
            expected: 1
          })
        ]
        this.result = new purespec.Result(this.returns, { results: this.results })
      })

      it('returns Result with runnable, results, and a falsy error', function () {
        expect(this.result.runnable).to.equal(this.returns)
        expect(this.result.results).to.deep.equal(this.results)
        expect(this.result.error).to.be.false
      })
    })

    context('given a runnable and failing results', function () {
      before(function () {
        this.results = [
          new purespec.Result(this.returns, {
            actual: 2,
            expected: 1
          })
        ]
        this.result = new purespec.Result(this.returns, { results: this.results })
      })

      it('returns Result with runnable, results, and a truthy error', function () {
        expect(this.result.runnable).to.equal(this.returns)
        expect(this.result.results).to.deep.equal(this.results)
        expect(this.result.error).to.be.true
      })
    })

    context('given a runnable and an error', function () {
      before(function () {
        this.error = new Error()
        this.result = new purespec.Result(this.returns, { error: this.error })
      })

      it('returns Result with runnable, empty results, and error', function () {
        expect(this.result.runnable).to.equal(this.returns)
        expect(this.result.results).to.be.empty
        expect(this.result.error).to.equal(this.error)
      })
    })

    context('given a runnable and equivalent actual and expected options', function () {
      before(function () {
        this.result = new purespec.Result(this.returns, {
          actual: 1,
          expected: 1
        })
      })

      it('returns Result with runnable, actual, expected, and a falsy error', function () {
        expect(this.result.runnable).to.equal(this.returns)
        expect(this.result.actual).to.equal(1)
        expect(this.result.expected).to.equal(1)
        expect(this.result.error).to.be.false
      })
    })

    context('given a runnable and nonequivalent actual and expected options', function () {
      before(function () {
        this.result = new purespec.Result(this.returns, {
          actual: 2,
          expected: 1
        })
      })

      it('returns Result with runnable, actual, expected, and a truthy error', function () {
        expect(this.result.runnable).to.equal(this.returns)
        expect(this.result.actual).to.equal(2)
        expect(this.result.expected).to.equal(1)
        expect(this.result.error).to.be.true
      })
    })
  })

  describe('.prototype.toString()', function () {
    context('when there is an error', function () {
      before(function () {
        this.result = new purespec.Result(this.returns, {
          actual: 2,
          expected: 1
        })
      })

      it('returns a red String with a cross, its runnable, a newline, and its error', function () {
        expect(this.result.toString()).to.equal(`${chalk.red('✗ returns 1')}\ntrue`)
      })
    })

    context('when there is no error', function () {
      before(function () {
        this.result = new purespec.Result(this.returns, {
          actual: 1,
          expected: 1
        })
      })

      it('returns a green String with a check and its runnable', function () {
        expect(this.result.toString()).to.equal(chalk.green('✓ returns 1'))
      })
    })
  })

  describe('.prototype.toTree()', function () {
    context('without results', function () {
      before(function () {
        this.result = new purespec.Result(this.returns, {
          actual: 1,
          expected: 1
        })
      })

      it('returns the result of .prototype.toString()', function () {
        expect(this.result.toTree()).to.equal(chalk.green('✓ returns 1'))
      })
    })

    context('with results', function () {
      before(function () {
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
        expect(this.result.toTree()).equal(`${chalk.green('✓ test')}\n  ${chalk.green('✓ returns 1')}`)
      })
    })
  })
})
