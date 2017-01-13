describe('Returns matcher', function () {
  before(function () {
    this.subject = () => 'Hello, World!'
    this.returns = new purespec.matchers.Returns('Hello, World!')
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Returns with the given result', function () {
      expect(this.returns.result).to.equal('Hello, World!')
    })
  })

  describe('.prototype.run()', function () {
    it('asserts its subject\'s return value to equal its result', function () {
      expect(this.returns.run(this.subject)).to.deep.equal(new purespec.Result(this.returns, {
        actual: 'Hello, World!',
        expected: 'Hello, World!'
      }))
    })
  })

  describe('.prototype.toString()', function () {
    it('returns a String representation with its result', function () {
      expect(this.returns.toString()).to.equal('returns Hello, World!')
    })
  })
})
