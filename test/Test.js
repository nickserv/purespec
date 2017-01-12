describe('Test', () => {
  var name = 'hello'
  var subject = name => `Hello, World!`
  var returns = new purespec.matchers.Returns('Hello, World!')
  var runnables = [returns]
  var test = new purespec.Test(name, subject, runnables)

  describe('.prototype.constructor()', () => {
    it('returns a new Test with the given data', () => {
      expect(test.name).to.equal(name)
      expect(test.subject).to.equal(subject)
      expect(test.runnables).to.equal(runnables)
    })
  })

  describe('.prototype.run()', () => {
    context('given passing tests', () => {
      it('returns a Promise resolving with a Result', () => {
        return test.run().then(result => {
          expect(result).to.deep.equal(new purespec.Result(test, {
            results: [
              new purespec.Result(returns, {
                actual: 'Hello, World!',
                expected: 'Hello, World!'
              })
            ]
          }))
        })
      })
    })

    context('given failing tests', () => {
      var sandbox
      var runnables = [new purespec.matchers.Returns()]

      beforeEach(() => {
        sandbox = sinon.sandbox.create()
        sandbox.stub(console, 'error')
        sandbox.stub(process, 'exit')
      })
      afterEach(() => sandbox.restore())

      function returnsARejectedPromise (subject) {
        it('returns a rejected Promise', () => {
          var test = new purespec.Test(name, subject, runnables)

          return test.run().then(() => {
            expect(console.error).to.have.been.calledWithExactly('message')
            expect(process.exit).to.have.been.calledWithExactly(1)
          })
        })
      }

      context('given a subject that throws a String', () => {
        returnsARejectedPromise(() => { throw 'message' }) // eslint-disable-line no-throw-literal
      })

      context('given a subject that throws an Error', () => {
        returnsARejectedPromise(() => { throw new Error('message') })
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns its name', () => {
      expect(test.toString()).to.equal('hello')
    })
  })

  describe('.prototype.toTree()', () => {
    it('returns a nested String of the Test and its runnables', () => {
      expect(test.toTree()).to.equal('hello\n  returns Hello, World!')
    })
  })
})
