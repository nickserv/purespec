describe('Throws matcher', function () {
  before(function () {
    this.subject = function () { throw new Error('Invalid') }
    this.throws = new purespec.matchers.Throws('Invalid')
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Throws with the given exception', function () {
      expect(this.throws.exception).to.equal('Invalid')
    })
  })

  describe('.prototype.run()', function () {
    context('given a subject that throws the given exception', function () {
      it('returns a passing Result', function () {
        expect(this.throws.run(this.subject)).to.deep.equal(new purespec.Result(this.throws, {
          actual: new Error('Invalid'),
          expected: new Error('Invalid')
        }))
      })
    })

    context('given a subject that doesn\'t throw an exception', function () {
      before(function () {
        this.subject = () => 1
      })

      it('returns a failing Result', function () {
        expect(this.throws.run(this.subject)).to.deep.equal(new purespec.Result(this.throws, {
          error: true
        }))
      })
    })
  })

  describe('.prototype.toString()', function () {
    it('returns a String representation with its exception', function () {
      expect(this.throws.toString()).to.equal('throws Invalid')
    })
  })
})
