const purespec = require('../..')

describe('Required matcher', function () {
  const name = 'purespec-hello'
  const subject = require('purespec-hello')
  const returns = new purespec.matchers.Returns('Hello, World!')
  const runnables = [returns]
  const required = new purespec.matchers.Required(name, ...runnables)

  describe('.prototype.constructor()', function () {
    describe('given a package', () => {
      it('returns a new Required with the given name and a required subject', function () {
        expect(required).toMatchObject({
          name,
          subject,
          runnables
        })
      })
    })

    describe('given a relative module path', () => {
      it('returns a new Required with the given name and a required subject', function () {
        const name = '.'
        const subject = purespec

        expect(new purespec.matchers.Required(name, ...runnables)).toMatchObject({
          name,
          subject,
          runnables
        })
      })
    })
  })

  describe('.prototype.toString()', function () {
    it('returns a String representation with its name', function () {
      expect(required.toString()).toBe('purespec-hello')
    })
  })
})
