describe('Throws matcher', () => {
  var throws = new purespec.matchers.Throws('Missing name')

  describe('.prototype.constructor()', () => {
    it('returns a new Throws with the given exception', () => {
      assert.deepEqual(throws.exception, 'Missing name')
    })
  })

  describe('.prototype.run()', () => {
    it('asserts its subject throws an exception matching its exception', () => {
      assert.deepStrictEqual(throws.run(example.hello.sync), new purespec.Result(throws, {
        actual: new Error('Missing name'),
        expected: new Error('Missing name')
      }))
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its exception', () => {
      assert.deepEqual(throws.toString(), 'throws Missing name')
    })
  })
})
