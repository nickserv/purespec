describe('Returns matcher', () => {
  var returns = new purespec.matchers.Returns('Hello, Nick!')
  var given = new purespec.matchers.Given('Nick', returns)

  describe('.prototype.constructor()', () => {
    it('returns a new Returns with the given result', () => {
      assert.deepEqual(returns.result, 'Hello, Nick!')
    })
  })

  describe('.prototype.run()', () => {
    it('asserts its subject\'s return value to equal its result', () => {
      return given.run(example.hello.sync).then(result => {
        assert.deepStrictEqual(result, new purespec.Result(given, {
          results: [
            new purespec.Result(returns, {
              actual: 'Hello, Nick!',
              expected: 'Hello, Nick!'
            })
          ]
        }))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its result', () => {
      assert.strictEqual(returns.toString(), 'returns Hello, Nick!')
    })
  })
})
