const purespec = require('..')

describe('Test matcher', () => {
  const subject = function hello () { return 'Hello, World!' } // eslint-disable-line lodash-fp/prefer-constant
  const returns = new purespec.matchers.Returns('Hello, World!')
  const runnables = [returns]
  const test = new purespec.matchers.Test(subject, ...runnables)

  describe('.prototype.constructor()', () => {
    it('returns a new Test with the given data', () => {
      expect(test).toMatchObject({
        subject,
        runnables
      })
    })
  })

  describe('.prototype.run()', () => {
    describe('given passing tests', () => {
      it('returns a Promise resolving with a Result', () => {
        return expect(test.run()).resolves.toEqual(new purespec.results.NestedResult(test, [
          new purespec.results.ComparisonResult(
            returns,
            'Hello, World!',
            'Hello, World!'
          )
        ]))
      })
    })

    describe('given failing tests', () => {
      it('returns a rejected Promise', () => {
        const runnables = [new purespec.matchers.Returns()]
        const subject = () => { throw new Error('message') }
        const test = new purespec.matchers.Test(subject, ...runnables)

        return expect(test.run()).rejects.toThrow('message')
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns its name', () => {
      expect(test.toString()).toBe('hello')
    })
  })
})
