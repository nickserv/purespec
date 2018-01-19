const Required = require('./Required')
const Returns = require('./Returns')
const path = require('path')

describe('Required matcher', () => {
  const name = 'util'
  const subject = require('util')
  const returns = new Returns('Hello, World!')
  const runnables = [returns]
  const required = new Required(name, ...runnables)

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
        const name = path.resolve(__dirname, './Required')
        const subject = Required

        expect(new Required(name, ...runnables)).toMatchObject({
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
