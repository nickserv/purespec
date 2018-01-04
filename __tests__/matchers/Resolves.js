const purespec = require('../..')

describe('Resolves matcher', () => {
  const resolves = new purespec.matchers.Resolves('Hello, World!')

  describe('.prototype.constructor()', () => {
    it('returns a new Resolves with the given result', () => {
      expect(resolves.result).toBe('Hello, World!')
    })
  })

  describe('.prototype.run()', () => {
    it('runs its subject as a Promise, asserting its actual result equals its expected result', () => {
      const subject = () => new Promise(setTimeout).then(() => 'Hello, World!')

      return resolves.run(subject).then(result => {
        expect(result).toEqual(new purespec.ComparisonResult(
          resolves,
          'Hello, World!',
          'Hello, World!'
        ))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its result', () => {
      expect(resolves.toString()).toBe('resolves with Hello, World!')
    })
  })
})
