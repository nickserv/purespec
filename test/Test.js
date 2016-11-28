describe('Test', () => {
  var name = 'hello'
  var subject = example.hello.sync
  var given = new purespec.matchers.Given(['Nick'], new purespec.matchers.Returns('Hello, Nick!'))
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
    context('given passing tests', () => {
      it('returns a resolved Promise', () => {
        return test.run()
      })
    })

    context('given failing tests', () => {
      var runnables = [new purespec.matchers.Returns()]

      function returnsARejectedPromise (thrown) {
        it('returns a Promise resolving with an errored Result', () => {
          var test = new purespec.Test(name, () => { throw thrown }, runnables)

          return test.run().then(result => {
            assert.strictEqual(result.runnable, test)
            assert.strictEqual(result.error, null)
            assert.deepEqual(result.results, [
              new purespec.Result(
                new purespec.matchers.Returns(undefined),
                thrown
              )
            ])
          })
        })
      }

      context('given a subject that throws a String', () => {
        returnsARejectedPromise('message') // eslint-disable-line no-throw-literal
      })

      context('given a subject that throws an Error', () => {
        returnsARejectedPromise(new Error('message'))
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
