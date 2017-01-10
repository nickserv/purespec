describe('Resolves matcher', () => {
  var resolves = new purespec.matchers.Resolves('Hello, Nick!')
  var given = new purespec.matchers.Given('Nick', resolves)

  describe('.prototype.constructor()', () => {
    it('returns a new Resolves with the given result', () => {
      assert.deepEqual(resolves.result, 'Hello, Nick!')
    })
  })

  describe('.prototype.run()', () => {
    it('runs its subject as a Promise, asserting its actual result equals its expected result', () => {
      return given.run(hello.promise).then(result => {
        assert.deepStrictEqual(result, new purespec.Result(given, {
          results: [
            new purespec.Result(resolves, {
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
      assert.strictEqual(resolves.toString(), 'resolves with Hello, Nick!')
    })
  })
})
