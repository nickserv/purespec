describe('Given matcher', () => {
  var subject = name => `Hello, ${name}!`
  var returns = new purespec.matchers.Returns('Hello, World!')
  var given = new purespec.matchers.Given('World', returns)

  describe('.prototype.constructor()', () => {
    it('returns a new Given with the given args and matcher', () => {
      expect(given.args).to.deep.equal(['World'])
      expect(given.matcher).to.deep.equal(new purespec.matchers.Returns('Hello, World!'))
    })
  })

  describe('.prototype.run()', () => {
    it('run its matcher with its args and returns a Promise with a Result', () => {
      return given.run(subject).then(result => {
        expect(result).to.deep.equal(new purespec.Result(given, {
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
      expect(given.toString()).to.equal('given World')
    })
  })

  describe('.prototype.toTree()', () => {
    it('returns a String representation with its args and matcher', () => {
      expect(given.toTree()).to.equal('given World\n  returns Hello, World!')
    })
  })
})
