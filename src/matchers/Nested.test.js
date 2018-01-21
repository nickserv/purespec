const ComparisonResult = require('../results/ComparisonResult')
const Nested = require('./Nested')
const NestedResult = require('../results/NestedResult')
const Result = require('../results/Result')
const Returns = require('./Returns')

describe('Nested matcher', () => {
  const subject = () => 'Hello, World!'
  const returns = new Returns('Hello, World!')
  const runnables = [returns]
  const nested = new Nested(...runnables)
  nested.toString = () => 'hello'

  describe('.prototype.constructor()', () => {
    it('returns a new Nested with the given data', () => {
      expect(nested).toMatchObject({ runnables })
    })
  })

  describe('.prototype.run()', () => {
    describe('given subject that throws', () => {
      it('returns a failing result', () => {
        const subject = () => { throw new Error('Missing name') }
        const nested = new Nested(...runnables)

        return expect(nested.run(subject)).resolves.toEqual(new NestedResult(nested, [
          new Result(returns, new Error('Missing name'))
        ]))
      })
    })

    describe('given passing nesteds', () => {
      it('returns a Promise resolving with a Result', () => {
        return expect(nested.run(subject)).resolves.toEqual(new NestedResult(nested, [
          new ComparisonResult(
            returns,
            'Hello, World!',
            'Hello, World!'
          )
        ]))
      })
    })

    describe('given failing nesteds', () => {
      it('returns a Promise resolving with a failing Result', () => {
        const subject = () => { throw new Error('message') }
        const nested = new Nested(...runnables)

        return expect(nested.run(subject)).resolves.toEqual(new NestedResult(nested, [
          new Result(returns, new Error('message'))
        ]))
      })
    })
  })

  describe('.prototype.toTree()', () => {
    describe('given nesteds with toTree', () => {
      test('returns a nested String of the Nested and its runnables', () => {
        const innerNested = new Nested()
        innerNested.toString = () => 'inner'
        const runnables = [innerNested]
        const nested = new Nested(...runnables)
        nested.toString = () => 'outer'

        expect(nested.toTree()).toBe('outer\n  inner')
      })
    })

    describe('given nesteds with toString', () => {
      it('returns a nested String of the Nested and its runnables', () => {
        expect(nested.toTree()).toBe('hello\n  returns Hello, World!')
      })
    })
  })
})
