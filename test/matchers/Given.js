describe('Given matcher', function () {
  before(function () {
    this.subject = name => `Hello, ${name}!`
    this.returns = new purespec.matchers.Returns('Hello, World!')
    this.given = new purespec.matchers.Given('World', this.returns)
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Given with the given args and matcher', function () {
      expect(this.given.args).to.deep.equal(['World'])
      expect(this.given.matcher).to.deep.equal(new purespec.matchers.Returns('Hello, World!'))
    })
  })

  describe('.prototype.run()', function () {
    it('run its matcher with its args and returns a Promise with a Result', function () {
      return this.given.run(this.subject).then(result => {
        expect(result).to.deep.equal(new purespec.Result(this.given, {
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
      expect(this.given.toString()).to.equal('given World')
    })
  })

  describe('.prototype.toTree()', function () {
    it('returns a String representation with its args and matcher', function () {
      expect(this.given.toTree()).to.equal('given World\n  returns Hello, World!')
    })
  })
})
