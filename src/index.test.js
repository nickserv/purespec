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
})
