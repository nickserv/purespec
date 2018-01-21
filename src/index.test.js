const Given = require('./matchers/Given')
const Returns = require('./matchers/Returns')
const Test = require('./matchers/Test')
const matchers = require('./matchers')
const purespec = require('.')

describe('PureSpec', () => {
  describe('dsl', () => {
    it('is a non-empty Object', () => {
      expect(purespec.dsl).toBeInstanceOf(Object)
      expect(purespec.dsl).not.toEqual({})
    })

    it('includes matcher shortcuts', () => {
      expect(Object.keys(purespec.dsl).reduce((memo, matcher) => {
        return Object.assign({
          [matcher[0].toUpperCase() + matcher.substr(1)]: purespec.dsl[matcher]().constructor
        }, memo)
      }, {})).toEqual(matchers)
    })
  })

  describe('load()', () => {
    it('returns tests loaded from the given PureSpec module', () => {
      const actual = purespec.load('examples/round.js')

      expect(actual).toBeInstanceOf(Test)
      expect(typeof actual.subject).toBe('function')
      expect(actual.runnables).toEqual([
        new Given(1, new Returns(1)),
        new Given(1.5, new Returns(2))
      ])
    })
  })
})
