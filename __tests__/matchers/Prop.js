var purespec = require('../..')

describe('Prop matcher', function () {
  beforeEach(function () {
    this.name = 'hello'
    this.returns = new purespec.matchers.Returns('Hello, World!')
    this.runnables = [this.returns]
    this.test = new purespec.matchers.Prop(this.name, ...this.runnables)
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Prop with the given property', function () {
      expect(this.test).toMatchObject({
        name: `.${this.name}`,
        subject: null,
        runnables: this.runnables
      })
    })
  })
})
