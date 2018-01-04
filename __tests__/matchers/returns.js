const purespec = require('../..')

describe('Returns matcher', () => {
  const returns = new purespec.matchers.Returns('Hello, World!')

  describe('.prototype.constructor()', () => {
    it('returns a new Returns with the given result', () => {
      expect(returns.result).toBe('Hello, World!')
    })
  })

  describe('.prototype.run()', () => {
    it('asserts its subject\'s return value to equal its result', () => {
      const subject = () => 'Hello, World!'

      expect(returns.run(subject)).toEqual(new purespec.ComparisonResult(
        returns,
        'Hello, World!',
        'Hello, World!'
      ))
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its result', () => {
      expect(returns.toString()).toBe('returns Hello, World!')
    })
  })
})
