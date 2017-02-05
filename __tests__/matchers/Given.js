describe('Given matcher', () => {
  var returns = new purespec.matchers.Returns('Hello, Nick!')
  var given = new purespec.matchers.Given('Nick', returns)

  describe('.prototype.constructor()', () => {
    it('returns a new Given with the given args and matcher', () => {
      expect(given.args).toEqual(['Nick'])
      expect(given.matcher).toEqual(new purespec.matchers.Returns('Hello, Nick!'))
    })
  })

  describe('.prototype.run()', () => {
    it('run its matcher with its args and returns a Promise with a Result', () => {
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
    it('returns a String representation with its args', () => {
      expect(given.toString()).toBe('given Nick')
    })
  })

  describe('.prototype.toTree()', () => {
    it('returns a String representation with its args and matcher', () => {
      expect(given.toTree()).toBe('given Nick\n  returns Hello, Nick!')
    })
  })
})
