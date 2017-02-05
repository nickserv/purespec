var example = require('../../example')
var purespec = require('../..')

describe('Returns matcher', () => {
  var returns = new purespec.matchers.Returns('Hello, Nick!')
  var given = new purespec.matchers.Given('Nick', returns)

  describe('.prototype.constructor()', () => {
    it('returns a new Returns with the given result', () => {
      expect(returns.result).toBe('Hello, Nick!')
    })
  })

  describe('.prototype.run()', () => {
    it('asserts its subject\'s return value to equal its result', () => {
      return given.run(example.hello.sync).then(result => {
        expect(result).toEqual(new purespec.Result(given, {
          results: [
            new purespec.Result(returns, {
              actual: 'Hello, Nick!',
              expected: 'Hello, Nick!'
            })
          ]
        }))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its result', () => {
      expect(returns.toString()).toBe('returns Hello, Nick!')
    })
  })
})
