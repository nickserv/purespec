describe('Resolves matcher', () => {
  var subject = () => new Promise(setTimeout).then(() => 'Hello, World!')
  var resolves = new purespec.matchers.Resolves('Hello, World!')

  describe('.prototype.constructor()', () => {
    it('returns a new Resolves with the given result', () => {
      expect(resolves.result).to.equal('Hello, World!')
    })
  })

  describe('.prototype.run()', () => {
    it('runs its subject as a Promise, asserting its actual result equals its expected result', () => {
      return resolves.run(subject).then(result => {
        expect(result).to.deep.equal(new purespec.Result(resolves, {
          actual: 'Hello, World!',
          expected: 'Hello, World!'
        }))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its result', () => {
      expect(resolves.toString()).to.equal('resolves with Hello, World!')
    })
  })
})
