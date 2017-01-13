describe('Resolves matcher', function () {
  before(function () {
    this.subject = () => new Promise(setTimeout).then(() => 'Hello, World!')
    this.resolves = new purespec.matchers.Resolves('Hello, World!')
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Resolves with the given result', function () {
      expect(this.resolves.result).to.equal('Hello, World!')
    })
  })

  describe('.prototype.run()', function () {
    it('runs its subject as a Promise, asserting its actual result equals its expected result', function () {
      return this.resolves.run(this.subject).then(result => {
        expect(result).to.deep.equal(new purespec.Result(this.resolves, {
          actual: 'Hello, World!',
          expected: 'Hello, World!'
        }))
      })
    })
  })

  describe('.prototype.toString()', function () {
    it('returns a String representation with its result', function () {
      expect(this.resolves.toString()).to.equal('resolves with Hello, World!')
    })
  })
})
