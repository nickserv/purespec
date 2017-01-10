describe('Throws matcher', () => {
  var subject = () => { throw new Error('Invalid') }
  var throws = new purespec.matchers.Throws('Invalid')

  describe('.prototype.constructor()', () => {
    it('returns a new Throws with the given exception', () => {
      assert.deepEqual(throws.exception, 'Invalid')
    })
  })

  describe('.prototype.run()', () => {
    context('given a subject that throws the given exception', () => {
      it('returns a passing Result', () => {
        assert.deepEqual(throws.run(subject), new purespec.Result(throws, {
          actual: new Error('Invalid'),
          expected: new Error('Invalid')
        }))
      })
    })

    context('given a subject that doesn\'t throw an exception', () => {
      var subject = () => 1

      it('returns a failing Result', () => {
        assert.deepEqual(throws.run(subject), new purespec.Result(throws, {
          error: true
        }))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its exception', () => {
      assert.deepEqual(throws.toString(), 'throws Invalid')
    })
  })
})
