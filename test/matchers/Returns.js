describe('Returns matcher', () => {
  var subject = () => 'Hello, World!'
  var returns = new purespec.matchers.Returns('Hello, World!')

  describe('.prototype.constructor()', () => {
    it('returns a new Returns with the given result', () => {
      expect(returns.result).to.equal('Hello, World!')
    })
  })

  describe('.prototype.run()', () => {
    it('asserts its subject\'s return value to equal its result', () => {
      expect(returns.run(subject)).to.deep.equal(new purespec.Result(returns, {
        actual: 'Hello, World!',
        expected: 'Hello, World!'
      }))
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its result', () => {
      expect(returns.toString()).to.equal('returns Hello, World!')
    })
  })
})
