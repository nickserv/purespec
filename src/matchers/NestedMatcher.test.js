const purespec = require('..')

describe('NestedMatcher matcher', () => {
  const subject = () => 'Hello, World!'
  const returns = new purespec.matchers.Returns('Hello, World!')
  const runnables = [returns]
  const nested = new purespec.matchers.NestedMatcher(...runnables)
  nested.toString = () => 'hello'

  describe('.prototype.constructor()', () => {
    it('returns a new NestedMatcher with the given data', () => {
      expect(nested).toMatchObject({ runnables })
    })
  })

  describe('.prototype.run()', () => {
    describe('given subject that throws', () => {
      it('returns a failing result', () => {
        const subject = () => { throw new Error('Missing name') }
        const nested = new purespec.matchers.NestedMatcher(...runnables)

        return expect(nested.run(subject)).resolves.toEqual(new purespec.results.NestedResult(nested, [
          new purespec.results.Result(returns, new Error('Missing name'))
        ]))
      })
    })

    describe('given passing nesteds', () => {
      it('returns a Promise resolving with a Result', () => {
        return expect(nested.run(subject)).resolves.toEqual(new purespec.results.NestedResult(nested, [
          new purespec.results.ComparisonResult(
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
        const nested = new purespec.matchers.NestedMatcher(...runnables)

        return expect(nested.run(subject)).resolves.toEqual(new purespec.results.NestedResult(nested, [
          new purespec.results.Result(returns, new Error('message'))
        ]))
      })
    })
  })

  describe('.prototype.toTree()', () => {
    describe('given nesteds with toTree', () => {
      test('returns a nested String of the NestedMatcher and its runnables', () => {
        const innerNested = new purespec.matchers.NestedMatcher()
        innerNested.toString = () => 'inner'
        const runnables = [innerNested]
        const nested = new purespec.matchers.NestedMatcher(...runnables)
        nested.toString = () => 'outer'

        expect(nested.toTree()).toBe('outer\n  inner')
      })
    })

    describe('given nesteds with toString', () => {
      it('returns a nested String of the NestedMatcher and its runnables', () => {
        expect(nested.toTree()).toBe('hello\n  returns Hello, World!')
      })
    })
  })
})
