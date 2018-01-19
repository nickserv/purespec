const ComparisonResult = require('../results/ComparisonResult')
const NestedResult = require('../results/NestedResult')
const Result = require('../results/Result')
const Returns = require('./Returns')
const Test = require('./Test')

describe('Test matcher', () => {
  const subject = function hello () { return 'Hello, World!' } // eslint-disable-line lodash-fp/prefer-constant
  const returns = new Returns('Hello, World!')
  const runnables = [returns]
  const test = new Test(subject, ...runnables)

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
        return expect(test.run()).resolves.toEqual(new NestedResult(test, [
          new ComparisonResult(
            returns,
            'Hello, World!',
            'Hello, World!'
          )
        ]))
      })
    })

    describe('given failing tests', () => {
      it('returns a failing result', () => {
        const subject = () => { throw new Error('message') }
        const test = new Test(subject, ...runnables)

        return expect(test.run()).resolves.toEqual(new NestedResult(test, [
          new Result(returns, new Error('message'))
        ]))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns its name', () => {
      expect(test.toString()).toBe('hello')
    })
  })
})
