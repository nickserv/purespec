var sinon = require('sinon')

describe('Test', () => {
  var name = 'hello'
  var subject = example.hello.sync
  var returns = new purespec.matchers.Returns('Hello, Nick!')
  var given = new purespec.matchers.Given('Nick', returns)
  var throws = new purespec.matchers.Throws('Missing name')
  var runnables = [given, throws]
  var test = new purespec.Test(name, subject, runnables)

  describe('.prototype.constructor()', () => {
    it('returns a new Test with the given data', () => {
      assert.strictEqual(test.name, name)
      assert.strictEqual(test.subject, subject)
      assert.strictEqual(test.runnables, runnables)
    })
  })

  describe('.prototype.run()', () => {
    describe('given passing tests', () => {
      it('returns a Promise resolving with a Result', () => {
        return test.run().then(result => {
          assert.deepEqual(result, new purespec.Result(test, {
            results: [
              new purespec.Result(given, {
                results: [
                  new purespec.Result(returns, {
                    actual: 'Hello, Nick!',
                    expected: 'Hello, Nick!'
                  })
                ]
              }),
              new purespec.Result(throws, {
                actual: new Error('Missing name'),
                expected: new Error('Missing name')
              })
            ]
          }))
        })
      })
    })

    describe('given failing tests', () => {
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
            sinon.assert.calledWithExactly(console.error, 'message')
            sinon.assert.calledWithExactly(process.exit, 1)
          })
        })
      }

      describe('given a subject that throws a String', () => {
        returnsARejectedPromise(() => { throw 'message' }) // eslint-disable-line no-throw-literal
      })

      describe('given a subject that throws an Error', () => {
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
      assert.equal(test.toTree(), 'hello\n  given Nick\n    returns Hello, Nick!\n  throws Missing name')
    })
  })
})
