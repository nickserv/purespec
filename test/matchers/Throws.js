describe('Throws matcher', () => {
  var subject = () => { throw new Error('Invalid') }
  var throws = new purespec.matchers.Throws('Invalid')

  describe('.prototype.constructor()', () => {
    it('returns a new Throws with the given exception', () => {
      expect(throws.exception).to.equal('Invalid')
    })
  })

  describe('.prototype.run()', () => {
    context('given a subject that throws the given exception', () => {
      it('returns a passing Result', () => {
        expect(throws.run(subject)).to.deep.equal(new purespec.Result(throws, {
          actual: new Error('Invalid'),
          expected: new Error('Invalid')
        }))
      })
    })

    context('given a subject that doesn\'t throw an exception', () => {
      var subject = () => 1

      it('returns a failing Result', () => {
        expect(throws.run(subject)).to.deep.equal(new purespec.Result(throws, {
          error: true
        }))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its exception', () => {
      expect(throws.toString()).to.equal('throws Invalid')
    })
  })
})
