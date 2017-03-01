var purespec = require('../..')

describe('Rejects matcher', function () {
  beforeEach(function () {
    this.subject = () => { throw new Error('Missing name') }
    this.rejects = new purespec.matchers.Rejects('Missing name')
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Rejects with the given reason', function () {
      expect(this.rejects.reason).toBe('Missing name')
    })
  })

  describe('.prototype.run()', function () {
    describe('given a subject that rejects', function () {
      it('runs its subject as a Promise, asserting a rejection with the given reason', function () {
        return this.rejects.run(this.subject).then(result => {
          expect(result).toEqual(new purespec.Result(this.rejects, {
            actual: new Error('Missing name'),
            expected: new Error('Missing name')
          }))
        })
      })
    })

    describe('given a subject that resolves', function () {
      beforeEach(function () {
        this.subject = () => Promise.resolve()
      })

      it('runs its subject as a Promise, failing to assert a rejection with the given reason', function (done) {
        this.rejects.run(this.subject)
          .then(() => done(true))
          .catch(reason => {
            expect(reason).toBe('Expected a rejection but resolved with World')
            done()
          })
      })
    })
  })

  describe('.prototype.toString()', function () {
    it('returns a String representation with its reason', function () {
      expect(this.rejects.toString()).toBe('rejects with Missing name')
    })
  })
})
