var purespec = require('../..')

describe('Given matcher', function () {
  beforeEach(function () {
    this.subject = name => `Hello, ${name}!`
    this.returns = new purespec.matchers.Returns('Hello, World!')
    this.given = new purespec.matchers.Given('World', this.returns)
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Given with the given args and matcher', function () {
      expect(this.given).toMatchObject({
        args: ['World'],
        matcher: new purespec.matchers.Returns('Hello, World!')
      })
    })
  })

  describe('.prototype.run()', function () {
    it('run its matcher with its args and returns a Promise with a Result', function () {
      return this.given.run(this.subject).then(result => {
        expect(result).toEqual(new purespec.Result(this.given, {
          results: [
            new purespec.Result(this.returns, {
              actual: 'Hello, World!',
              expected: 'Hello, World!'
            })
          ]
        }))
      })
    })
  })

  describe('.prototype.toString()', function () {
    it('returns a String representation with its args', function () {
      expect(this.given.toString()).toBe('given World')
    })
  })

  describe('.prototype.toTree()', function () {
    it('returns a String representation with its args and matcher', function () {
      expect(this.given.toTree()).toBe('given World\n  returns Hello, World!')
    })
  })
})
