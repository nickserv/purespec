describe('Test', function () {
  before(function () {
    this.name = 'hello'
    this.subject = function hello () { return 'Hello, World!' }
    this.returns = new purespec.matchers.Returns('Hello, World!')
    this.runnables = [this.returns]
    this.pTest = new purespec.Test(this.name, this.subject, this.runnables)
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Test with the given data', function () {
      expect(this.pTest.name).to.equal(this.name)
      expect(this.pTest.subject).to.equal(this.subject)
      expect(this.pTest.runnables).to.equal(this.runnables)
    })
  })

  describe('.prototype.run()', function () {
    context('given passing tests', function () {
      it('returns a Promise resolving with a Result', function () {
        return this.pTest.run().then(result => {
          expect(result).to.deep.equal(new purespec.Result(this.pTest, {
            results: [
              new purespec.Result(this.returns, {
                actual: 'Hello, World!',
                expected: 'Hello, World!'
              })
            ]
          }))
        })
      })
    })

    context('given failing tests', function () {
      before(function () {
        this.runnables = [new purespec.matchers.Returns()]
      })

      beforeEach(function () {
        this.sandbox = sinon.sandbox.create()
        this.sandbox.stub(console, 'error')
        this.sandbox.stub(process, 'exit')
      })

      afterEach(function () {
        this.sandbox.restore()
      })

      function returnsARejectedPromise (subject) {
        it('returns a rejected Promise', function () {
          var test = new purespec.Test(this.name, subject, this.runnables)

          return test.run().then(() => {
            expect(console.error).to.have.been.calledWithExactly('message')
            expect(process.exit).to.have.been.calledWithExactly(1)
          })
        })
      }

      context('given a subject that throws a String', function () {
        returnsARejectedPromise(() => { throw 'message' }) // eslint-disable-line no-throw-literal
      })

      context('given a subject that throws an Error', function () {
        returnsARejectedPromise(() => { throw new Error('message') })
      })
    })
  })

  describe('.prototype.toString()', function () {
    it('returns its name', function () {
      expect(this.pTest.toString()).to.equal('hello')
    })
  })

  describe('.prototype.toTree()', function () {
    it('returns a nested String of the Test and its runnables', function () {
      expect(this.pTest.toTree()).to.equal('hello\n  returns Hello, World!')
    })
  })
})
