var purespec = require('../..')

describe('Throws matcher', () => {
  var throws = new purespec.matchers.Throws('Invalid')

  describe('.prototype.constructor()', () => {
    it('returns a new Throws with the given exception', () => {
      expect(throws.exception).toBe('Invalid')
    })
  })

  describe('.prototype.run()', () => {
    describe('given a subject that throws the given exception', () => {
      it('returns a passing Result', () => {
        var subject = () => { throw new Error('Invalid') }

        expect(throws.run(subject)).toEqual(new purespec.Result(throws, {
          actual: new Error('Invalid'),
          expected: new Error('Invalid')
        }))
      })
    })

    describe('given a subject that doesn\'t throw an exception', () => {
      it('returns a failing Result', () => {
        expect(throws.run(() => 1)).toEqual(new purespec.Result(throws, {
          error: true
        }))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its exception', () => {
      expect(throws.toString()).toBe('throws Invalid')
    })
  })
})
