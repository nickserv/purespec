const purespec = require('../..')

describe('Prop matcher', function () {
  const name = 'hello'
  const subject = { hello () { return 'Hello, World!' } } // eslint-disable-line lodash-fp/prefer-constant
  const returns = new purespec.matchers.Returns('Hello, World!')
  const runnables = [returns]
  const test = new purespec.matchers.Prop(name, ...runnables)

  describe('.prototype.constructor()', function () {
    it('returns a new Prop with the given property', function () {
      expect(test).toMatchObject({
        name,
        runnables
      })
    })
  })

  describe('.prototype.run()', function () {
    it('returns the result of its property', function () {
      return expect(test.run(subject)).resolves.toEqual(new purespec.NestedResult(test, [
        new purespec.ComparisonResult(
          returns,
          'Hello, World!',
          'Hello, World!')
      ]))
    })
  })

  describe('.prototype.toString()', function () {
    it('returns a String representation with its name', function () {
      expect(test.toString()).toBe('.hello')
    })
  })
})
