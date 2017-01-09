describe('Given matcher', () => {
  var given = new purespec.matchers.Given(['Nick'], new purespec.matchers.Returns('Hello, Nick!'))

  describe('.prototype.constructor()', () => {
    it('returns a new Given with the given args and matcher', () => {
      assert.deepEqual(given.args, ['Nick'])
      assert.deepStrictEqual(given.matcher, new purespec.matchers.Returns('Hello, Nick!'))
    })
  })

  describe('.prototype.run()', () => {
    it('run its matcher with its args', () => {
      given.run(example.hello.sync)
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its args and matcher', () => {
      assert.strictEqual(given.toString(), 'given Nick returns Hello, Nick!')
    })
  })
})
