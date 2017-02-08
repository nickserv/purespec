var purespec = require('../..')

describe('Returns matcher', function () {
  beforeEach(function () {
    this.subject = () => 'Hello, World!'
    this.returns = new purespec.matchers.Returns('Hello, World!')
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Returns with the given result', function () {
      expect(this.returns.result).toBe('Hello, World!')
    })
  })

  describe('.prototype.run()', function () {
    it('asserts its subject\'s return value to equal its result', function () {
      expect(this.returns.run(this.subject)).toEqual(new purespec.Result(this.returns, {
        actual: 'Hello, World!',
        expected: 'Hello, World!'
      }))
    })
  })

  describe('.prototype.toString()', function () {
    it('returns a String representation with its result', function () {
      expect(this.returns.toString()).toBe('returns Hello, World!')
    })
  })
})
