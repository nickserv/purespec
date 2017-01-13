describe('Rejects matcher', function () {
  before(function () {
    this.subject = () => new Promise(setTimeout).then(() => {
      throw new Error('Invalid')
    })
    this.rejects = new purespec.matchers.Rejects('Invalid')
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Rejects with the given reason', function () {
      expect(this.rejects.reason).to.equal('Invalid')
    })
  })

  describe('.prototype.run()', function () {
    context('given a subject that rejects with a String', function () {
      it('runs its subject as a Promise, asserting a rejection with the given reason')
    })

    context('given a subject that rejects with an Error', function () {
      it('runs its subject as a Promise, asserting a rejection with the given reason', function () {
        return this.rejects.run(this.subject).then(result => {
          expect(result).to.deep.equal(new purespec.Result(this.rejects, {
            actual: new Error('Invalid'),
            expected: new Error('Invalid')
          }))
        })
      })
    })

    context('given a subject that resolves', function () {
      it('runs its subject as a Promise, failing to assert a rejection with the given reason')
    })
  })

  describe('.prototype.toString()', function () {
    it('returns a String representation with its reason', function () {
      expect(this.rejects.toString()).to.equal('rejects with Invalid')
    })
  })
})
