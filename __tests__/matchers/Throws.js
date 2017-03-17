const purespec = require('../..')

describe('Throws matcher', () => {
  const throws = new purespec.matchers.Throws('Invalid')

  describe('.prototype.constructor()', () => {
    it('returns a new Throws with the given exception', () => {
      expect(throws.exception).toBe('Invalid')
    })
  })

  describe('.prototype.run()', () => {
    describe('given a subject that throws the given exception', () => {
      it('returns a passing ComparisonResult', () => {
        const subject = () => { throw new Error('Invalid') }

        expect(throws.run(subject)).toEqual(new purespec.ComparisonResult(
          throws,
          new Error('Invalid'),
          new Error('Invalid')
        ))
      })
    })

    describe('given a subject that doesn\'t throw an exception', () => {
      it('returns a failing Result', () => {
        expect(throws.run(() => 1)).toEqual(new purespec.Result(throws, true))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its exception', () => {
      expect(throws.toString()).toBe('throws Invalid')
    })
  })
})
