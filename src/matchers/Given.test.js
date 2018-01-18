const purespec = require('..')

describe('Given matcher', () => {
  const returns = new purespec.matchers.Returns('Hello, World!')
  const given = new purespec.matchers.Given('World', returns)

  describe('.prototype.constructor()', () => {
    it('returns a new Given with the given args and matcher', () => {
      expect(given).toMatchObject({
        args: ['World'],
        runnables: [new purespec.matchers.Returns('Hello, World!')]
      })
    })
  })

  describe('.prototype.run()', () => {
    it('run its matcher with its args and returns a Promise with a NestedResult', () => {
      return expect(given.run(name => `Hello, ${name}!`)).resolves.toEqual(new purespec.results.NestedResult(given, [
        new purespec.results.ComparisonResult(returns, 'Hello, World!', 'Hello, World!')
      ]))
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its args', () => {
      expect(given.toString()).toBe('given World')
    })
  })
})
