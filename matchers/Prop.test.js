const ComparisonResult = require('../results/ComparisonResult')
const NestedResult = require('../results/NestedResult')
const Prop = require('./Prop')
const Returns = require('./Returns')

describe('Prop matcher', () => {
  const name = 'hello'
  const subject = { hello () { return 'Hello, World!' } }
  const returns = new Returns('Hello, World!')
  const matchers = [returns]
  const test = new Prop(name, ...matchers)

  describe('.prototype.constructor()', () => {
    it('returns a new Prop with the given property', () => {
      expect(test).toMatchObject({
        name,
        matchers
      })
    })
  })

  describe('.prototype.run()', () => {
    it('returns the result of its property', () => {
      return expect(test.run(subject)).resolves.toEqual(new NestedResult(test, [
        new ComparisonResult(
          returns,
          'Hello, World!',
          'Hello, World!'
        )
      ]))
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its name', () => {
      expect(test.toString()).toBe('.hello')
    })
  })
})
