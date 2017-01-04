describe('Rejects matcher', () => {
  var rejects = new purified.matchers.Rejects('Missing name')

  describe('.prototype.constructor()', () => {
    it('returns a new Rejects with the given reason', () => {
      assert.deepEqual(rejects.reason, 'Missing name')
    })
  })

  describe('.prototype.run()', () => {
    it('runs its subject as a Promise, asserting a rejection with the given reason', () => {
      return rejects.run(example.hello.promise)
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its reason', () => {
      assert.strictEqual(rejects.toString(), 'rejects with Missing name')
    })
  })
})
