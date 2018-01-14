const purespec = require('../..')

describe('Prop matcher', () => {
  const name = 'hello'
  const subject = { hello () { return 'Hello, World!' } } // eslint-disable-line lodash-fp/prefer-constant
  const returns = new purespec.matchers.Returns('Hello, World!')
  const runnables = [returns]
  const test = new purespec.matchers.Prop(name, ...runnables)

  describe('.prototype.constructor()', () => {
    it('returns a new Prop with the given property', () => {
      expect(test).toMatchObject({
        name,
        runnables
      })
    })
  })

  describe('.prototype.run()', () => {
    it('returns the result of its property', () => {
      return expect(test.run(subject)).resolves.toEqual(new purespec.NestedResult(test, [
        new purespec.ComparisonResult(
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
