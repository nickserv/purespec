describe('Throws matcher', () => {
  var throws = new purespec.matchers.Throws('Missing name')

  describe('.prototype.constructor()', () => {
    it('returns a new Throws with the given exception', () => {
      assert.deepEqual(throws.exception, 'Missing name')
    })
  })

  describe('.prototype.run()', () => {
    describe('given a subject that throws the given exception', () => {
      it('returns a passing Result', () => {
        assert.deepStrictEqual(throws.run(example.hello.sync), new purespec.Result(throws, {
          actual: new Error('Missing name'),
          expected: new Error('Missing name')
        }))
      })
    })

    describe('given a subject that doesn\'t throw an exception', () => {
      var subject = () => 1

      it('returns a failing Result', () => {
        assert.deepStrictEqual(throws.run(subject), new purespec.Result(throws, {
          error: true
        }))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its exception', () => {
      assert.deepEqual(throws.toString(), 'throws Missing name')
    })
  })
})
