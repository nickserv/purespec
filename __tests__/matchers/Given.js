var purespec = require('../..')

describe('Given matcher', () => {
  var returns = new purespec.matchers.Returns('Hello, World!')
  var given = new purespec.matchers.Given('World', returns)

  describe('.prototype.constructor()', () => {
    it('returns a new Given with the given args and matcher', () => {
      expect(given).toMatchObject({
        args: ['World'],
        matcher: new purespec.matchers.Returns('Hello, World!')
      })
    })
  })

  describe('.prototype.run()', () => {
    it('run its matcher with its args and returns a Promise with a Result', () => {
      return given.run(name => `Hello, ${name}!`).then(result => {
        expect(result).toEqual(new purespec.Result(given, {
          results: [
            new purespec.Result(returns, {
              actual: 'Hello, World!',
              expected: 'Hello, World!'
            })
          ]
        }))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its args', () => {
      expect(given.toString()).toBe('given World')
    })
  })

  describe('.prototype.toTree()', () => {
    it('returns a String representation with its args and matcher', () => {
      expect(given.toTree()).toBe('given World\n  returns Hello, World!')
    })
  })
})
