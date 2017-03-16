var purespec = require('../..')

describe('Required matcher', function () {
  beforeEach(function () {
    this.name = 'purespec-hello'
    this.subject = require('purespec-hello')
    this.returns = new purespec.matchers.Returns('Hello, World!')
    this.runnables = [this.returns]
    this.required = new purespec.matchers.Required(this.name, ...this.runnables)
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Required with the given name and a required subject', function () {
      expect(this.required).toMatchObject({
        name: this.name,
        subject: this.subject,
        runnables: this.runnables
      })
    })
  })
})
