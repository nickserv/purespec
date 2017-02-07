var purespec = require('..')

console.error = jest.fn()
process.exit = jest.fn()

describe('Test', function () {
  beforeEach(function () {
    this.name = 'hello'
    this.subject = function hello () { return 'Hello, World!' }
    this.returns = new purespec.matchers.Returns('Hello, World!')
    this.given = new purespec.matchers.Given('World', this.returns)
    this.throws = new purespec.matchers.Throws('Missing name')
    this.runnables = [this.returns]
    this.test = new purespec.Test(this.name, this.subject, this.runnables)
  })

  describe('.prototype.constructor()', function () {
    it('returns a new Test with the given data', function () {
      expect(this.test).toMatchObject({
        name: this.name,
        subject: this.subject,
        runnables: this.runnables
      })
    })
  })

  describe('.prototype.run()', function () {
    describe('given passing tests', function () {
      it('returns a Promise resolving with a Result', function () {
        return this.test.run().then(result => {
          expect(result).toEqual(new purespec.Result(this.test, {
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

    describe('given failing tests', function () {
      beforeEach(function () {
        this.runnables = [new purespec.matchers.Returns()]
      })

      function returnsARejectedPromise (subject) {
        it('returns a rejected Promise', function () {
          var test = new purespec.Test(this.name, subject, this.runnables)

          return test.run().then(() => {
            expect(console.error).toHaveBeenCalledWith('message')
            expect(process.exit).toHaveBeenCalledWith(1)
          })
        })
      }

      describe('given a subject that throws a String', function () {
        returnsARejectedPromise(() => { throw 'message' }) // eslint-disable-line no-throw-literal
      })

      describe('given a subject that throws an Error', function () {
        returnsARejectedPromise(() => { throw new Error('message') })
      })
    })
  })

  describe('.prototype.toString()', function () {
    it('returns its name', function () {
      expect(this.test.toString()).toBe('hello')
    })
  })

  describe('.prototype.toTree()', function () {
    it('returns a nested String of the Test and its runnables', function () {
      expect(this.test.toTree()).toBe('hello\n  returns Hello, World!')
    })
  })
})
