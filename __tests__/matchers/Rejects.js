const purespec = require('../..')

describe('Rejects matcher', () => {
  const rejects = new purespec.matchers.Rejects('Missing name')

  describe('.prototype.constructor()', () => {
    it('returns a new Rejects with the given reason', () => {
      expect(rejects.reason).toBe('Missing name')
    })
  })

  describe('.prototype.run()', () => {
    describe('given a subject that rejects with an Error', () => {
      it('runs its subject as a Promise, asserting a rejection with the given reason', () => {
        const subject = () => { throw new Error('Missing name') }

        return expect(rejects.run(subject)).resolves.toEqual(new purespec.ComparisonResult(
          rejects,
          new Error('Missing name'),
          new Error('Missing name')
        ))
      })
    })

    describe('given a subject that rejects with a String', () => {
      it('runs its subject as a Promise, asserting a rejection with the given reason', () => {
        const subject = () => Promise.reject('Missing name') // eslint-disable-line prefer-promise-reject-errors

        return expect(rejects.run(subject)).resolves.toEqual(new purespec.ComparisonResult(
          rejects,
          new Error('Missing name'),
          new Error('Missing name')
        ))
      })
    })

    describe('given a subject that resolves', () => {
      it('runs its subject as a Promise, failing to assert a rejection with the given reason', () => {
        return expect(rejects.run(() => Promise.resolve())).resolves.toEqual(new purespec.Result(rejects, true))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its reason', () => {
      expect(rejects.toString()).toBe('rejects with Missing name')
    })
  })
})
