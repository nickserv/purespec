const purespec = require('../..')

describe('Prop matcher', function () {
  const name = 'hello'
  const returns = new purespec.matchers.Returns('Hello, World!')
  const runnables = [returns]
  const test = new purespec.matchers.Prop(name, ...runnables)

  describe('.prototype.constructor()', function () {
    it('returns a new Prop with the given property', function () {
      expect(test).toMatchObject({
        name: `.${name}`,
        subject: null,
        runnables
      })
    })
  })
})
