var purespec = require('../..')

console.error = jest.fn()
process.exit = jest.fn()

describe('Test matcher', () => {
  var name = 'hello'
  var subject = () => 'Hello, World!'
  var returns = new purespec.matchers.Returns('Hello, World!')
  var runnables = [returns]
  var test = new purespec.matchers.Test(name, subject, ...runnables)

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
          expect(result).toEqual(new purespec.Result(test, {
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

    describe('given failing tests', () => {
      it('returns a rejected Promise', () => {
        var runnables = [new purespec.matchers.Returns()]
        var subject = () => { throw new Error('message') }
        var test = new purespec.matchers.Test(name, subject, ...runnables)

        return test.run().then(() => {
          expect(console.error).toHaveBeenCalledWith('message')
          expect(process.exit).toHaveBeenCalledWith(1)
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
