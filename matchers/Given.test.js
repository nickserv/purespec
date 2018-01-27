const ComparisonResult = require('../results/ComparisonResult')
const Given = require('./Given')
const NestedResult = require('../results/NestedResult')
const Returns = require('./Returns')

describe('Given matcher', () => {
  const returns = new Returns('Hello, World!')
  const given = new Given('World', returns)

  describe('.prototype.constructor()', () => {
    it('returns a new Given with the given args and matcher', () => {
      expect(given).toMatchObject({
        args: ['World'],
        matchers: [new Returns('Hello, World!')]
      })
    })
  })

  describe('.prototype.run()', () => {
    it('run its matcher with its args and returns a Promise with a NestedResult', () => {
      return expect(given.run(name => `Hello, ${name}!`)).resolves.toEqual(new NestedResult(given, [
        new ComparisonResult(returns, 'Hello, World!', 'Hello, World!')
      ]))
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its args', () => {
      expect(given.toString()).toBe('given World')
    })
  })
})
