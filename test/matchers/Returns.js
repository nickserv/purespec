describe('Returns matcher', () => {
  var subject = () => 'Hello, World!'
  var returns = new purespec.matchers.Returns('Hello, World!')

  describe('.prototype.constructor()', () => {
    it('returns a new Returns with the given result', () => {
      assert.deepEqual(returns.result, 'Hello, World!')
    })
  })

  describe('.prototype.run()', () => {
    it('asserts its subject\'s return value to equal its result', () => {
      assert.deepStrictEqual(returns.run(subject), new purespec.Result(returns, {
        actual: 'Hello, World!',
        expected: 'Hello, World!'
      }))
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its result', () => {
      assert.strictEqual(returns.toString(), 'returns Hello, World!')
    })
  })
})
