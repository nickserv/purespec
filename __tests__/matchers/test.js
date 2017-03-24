const purespec = require('../..')

describe('Test matcher', () => {
  const name = 'hello'
  const subject = () => 'Hello, World!'
  const returns = new purespec.matchers.Returns('Hello, World!')
  const runnables = [returns]
  const test = new purespec.matchers.Test(name, subject, ...runnables)

  describe('.prototype.constructor()', () => {
    it('returns a new Test with the given data', () => {
      expect(test).toMatchObject({
        name,
        subject,
        runnables
      })
    })
  })

  describe('.prototype.run()', () => {
    describe('given passing tests', () => {
      it('returns a Promise resolving with a Result', () => {
        return test.run().then(result => {
          expect(result).toEqual(new purespec.NestedResult(test, [
            new purespec.ComparisonResult(returns,
                                          'Hello, World!',
                                          'Hello, World!')
          ]))
        })
      })
    })

    describe('given failing tests', () => {
      it('returns a rejected Promise', done => {
        const runnables = [new purespec.matchers.Returns()]
        const subject = () => { throw new Error('message') }
        const test = new purespec.matchers.Test(name, subject, ...runnables)

        test.run()
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
      expect(test.toString()).toBe('hello')
    })
  })

  describe('.prototype.toTree()', () => {
    it('returns a nested String of the Test and its runnables', () => {
      expect(test.toTree()).toBe('hello\n  returns Hello, World!')
    })
  })
})
