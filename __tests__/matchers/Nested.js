const purespec = require('../..')

describe('Nested matcher', () => {
  const name = 'hello'
  const subject = () => 'Hello, World!'
  const returns = new purespec.matchers.Returns('Hello, World!')
  const runnables = [returns]
  const nested = new purespec.matchers.Nested(name, ...runnables)

  describe('.prototype.constructor()', () => {
    it('returns a new Nested with the given data', () => {
      expect(nested).toMatchObject({ name, runnables })
    })
  })

  describe('.prototype.run()', () => {
    describe('given passing nesteds', () => {
      it('returns a Promise resolving with a Result', () => {
        return nested.run(subject).then(result => {
          expect(result).toEqual(new purespec.NestedResult(nested, [
            new purespec.ComparisonResult(returns,
                                          'Hello, World!',
                                          'Hello, World!')
          ]))
        })
      })
    })

    describe('given failing nesteds', () => {
      it('returns a rejected Promise', done => {
        const runnables = [new purespec.matchers.Returns()]
        const subject = () => { throw new Error('message') }
        const nested = new purespec.matchers.Nested(name, ...runnables)

        nested.run(subject)
          .then(() => done(true))
          .catch(reason => {
            expect(reason).toEqual(new Error('message'))
            done()
          })
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns its name', () => {
      expect(nested.toString()).toBe('hello')
    })
  })

  describe('.prototype.toTree()', () => {
    it('returns a nested String of the Nested and its runnables', () => {
      expect(nested.toTree()).toBe('hello\n  returns Hello, World!')
    })
  })
})
