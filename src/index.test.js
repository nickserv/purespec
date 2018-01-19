const _ = require('lodash/fp')
const matchers = require('./matchers')
const purespec = require('.')

describe('PureSpec', () => {
  describe('dsl', () => {
    it('is a non-empty Object', () => {
      expect(purespec.dsl).toBeInstanceOf(Object)
      expect(purespec.dsl).not.toEqual({})
    })

    it('includes matcher shortcuts', () => {
      _.forEach(purespec.dsl)(dslMatcher => {
        expect(_.values(matchers)).toContain(dslMatcher().constructor)
      })
    })
  })
})
