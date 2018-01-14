const purespec = require('../..')

describe('Required matcher', () => {
  const name = 'util'
  const subject = require('util')
  const returns = new purespec.matchers.Returns('Hello, World!')
  const runnables = [returns]
  const required = new purespec.matchers.Required(name, ...runnables)

  describe('.prototype.constructor()', () => {
    describe('given a package', () => {
      it('returns a new Required with the given name and a required subject', () => {
        expect(required).toMatchObject({
          name,
          subject,
          runnables
        })
      })
    })

    describe('given a relative module path', () => {
      it('returns a new Required with the given name and a required subject', () => {
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

  describe('.prototype.toString()', () => {
    it('returns a String representation with its name', () => {
      expect(required.toString()).toBe('util')
    })
  })
})
