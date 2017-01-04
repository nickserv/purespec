/* eslint-env mocha */
describe('Returns matcher', () => {
  var returns = new purified.matchers.Given(['Nick'], new purified.matchers.Returns('Hello, Nick!'))

  describe('.prototype.constructor()', () => {
    it('returns a new Returns with the given result', () => {
      assert.deepEqual(returns.matcher.result, 'Hello, Nick!')
    })
  })

  describe('.prototype.run()', () => {
    it('asserts its subject\'s return value to equal its result', () => {
      returns.run(example.hello.sync)
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its result', () => {
      assert.strictEqual(returns.matcher.toString(), 'returns Hello, Nick!')
    })
  })
})
