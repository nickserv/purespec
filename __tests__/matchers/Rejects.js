const purespec = require('../..')

describe('Rejects matcher', () => {
  const rejects = new purespec.matchers.Rejects('Missing name')

  describe('.prototype.constructor()', () => {
    it('returns a new Rejects with the given reason', () => {
      expect(rejects.reason).toBe('Missing name')
    })
  })

  describe('.prototype.run()', () => {
    describe('given a subject that rejects', () => {
      it('runs its subject as a Promise, asserting a rejection with the given reason', () => {
        const subject = () => { throw new Error('Missing name') }

        return rejects.run(subject).then(result => {
          expect(result).toEqual(new purespec.Result(rejects, {
            actual: new Error('Missing name'),
            expected: new Error('Missing name')
          }))
        })
      })
    })

    describe('given a subject that resolves', () => {
      it('runs its subject as a Promise, failing to assert a rejection with the given reason', (done) => {
        rejects.run(() => Promise.resolve())
          .then(() => done(true))
          .catch(reason => {
            expect(reason).toBe('Expected a rejection but resolved with World')
            done()
          })
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its reason', () => {
      expect(rejects.toString()).toBe('rejects with Missing name')
    })
  })
})
