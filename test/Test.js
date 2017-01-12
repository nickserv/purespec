describe('Test', () => {
  var name = 'hello'
  var subject = name => `Hello, World!`
  var returns = new purespec.matchers.Returns('Hello, World!')
  var runnables = [returns]
  var test = new purespec.Test(name, subject, runnables)

  describe('.prototype.constructor()', () => {
    it('returns a new Test with the given data', () => {
      assert.strictEqual(test.name, name)
      assert.strictEqual(test.subject, subject)
      assert.strictEqual(test.runnables, runnables)
    })
  })

  describe('.prototype.run()', () => {
    context('given passing tests', () => {
      it('returns a Promise resolving with a Result', () => {
        return test.run().then(result => {
          assert.deepEqual(result, new purespec.Result(test, {
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
            assert.calledWithExactly(console.error, 'message')
            assert.calledWithExactly(process.exit, 1)
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
      assert.equal(test.toString(), 'hello')
    })
  })

  describe('.prototype.toTree()', () => {
    it('returns a nested String of the Test and its runnables', () => {
      assert.equal(test.toTree(), 'hello\n  returns Hello, World!')
    })
  })
})
