var purespec = require('../..')

describe('Throws matcher', () => {
  var throws = new purespec.matchers.Throws('Missing name')

  describe('.prototype.constructor()', () => {
    it('returns a new Throws with the given exception', () => {
      expect(throws.exception).toBe('Missing name')
    })
  })

  describe('.prototype.run()', () => {
    describe('given a subject that throws the given exception', () => {
      it('returns a passing Result', () => {
        expect(throws.run(purespec.example.hello.sync)).toEqual(new purespec.Result(throws, {
          actual: new Error('Missing name'),
          expected: new Error('Missing name')
        }))
      })
    })

    describe('given a subject that doesn\'t throw an exception', () => {
      var subject = () => 1

      it('returns a failing Result', () => {
        expect(throws.run(subject)).toEqual(new purespec.Result(throws, {
          error: true
        }))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its exception', () => {
      expect(throws.toString()).toBe('throws Missing name')
    })
  })
})
