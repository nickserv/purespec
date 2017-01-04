/* eslint-env mocha */
describe('Resolves matcher', () => {
  var resolves = new purified.matchers.Given(['Nick'], new purified.matchers.Resolves('Hello, Nick!'))

  describe('.prototype.constructor()', () => {
    it('returns a new Resolves with the given result', () => {
      assert.deepEqual(resolves.matcher.result, 'Hello, Nick!')
    })
  })

  describe('.prototype.run()', () => {
    it('runs its subject as a Promise, asserting its actual result equals its expected result', () => {
      return resolves.run(example.hello.promise)
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its result', () => {
      assert.strictEqual(resolves.matcher.toString(), 'resolves with Hello, Nick!')
    })
  })
})
