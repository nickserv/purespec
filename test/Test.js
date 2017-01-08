var sinon = require('sinon')

describe('Test', () => {
  var name = 'hello'
  var subject = example.hello.sync
  var given = new purified.matchers.Given(['Nick'], new purified.matchers.Returns('Hello, Nick!'))
  var throws = new purified.matchers.Throws('Missing name')
  var runnables = [given, throws]
  var test = new purified.Test(name, subject, runnables)

  describe('.prototype.constructor()', () => {
    it('returns a new Test with the given data', () => {
      assert.strictEqual(test.name, name)
      assert.strictEqual(test.subject, subject)
      assert.strictEqual(test.runnables, runnables)
    })
  })

  describe('.prototype.run()', () => {
    context('given passing tests', () => {
      it('returns a resolved Promise', () => {
        return test.run()
      })
    })

    context('given failing tests', () => {
      var sandbox
      var runnables = [new purified.matchers.Returns()]

      beforeEach(() => {
        sandbox = sinon.sandbox.create()
        sandbox.stub(console, 'error')
        sandbox.stub(process, 'exit')
      })
      afterEach(() => sandbox.restore())

      function returnsARejectedPromise (subject) {
        it('returns a rejected Promise', () => {
          var test = new purified.Test(name, subject, runnables)

          return test.run().then(() => {
            sinon.assert.calledWithExactly(console.error, 'message')
            sinon.assert.calledWithExactly(process.exit, 1)
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
    it('returns a nested String of the Test and its runnables', () => {
      assert.equal(test.toString(), 'hello\n  given Nick returns Hello, Nick!\n  throws Missing name')
    })
  })
})
