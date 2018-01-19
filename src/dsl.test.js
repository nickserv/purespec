const _ = require('lodash/fp')
const dsl = require('./dsl')
const matchers = require('./matchers')

describe('dsl', () => {
  it('is a non-empty Object', () => {
    expect(dsl).toBeInstanceOf(Object)
    expect(dsl).not.toEqual({})
  })

  it('includes matcher shortcuts', () => {
    _.forEach(dsl)(dslMatcher => {
      expect(_.values(matchers)).toContain(dslMatcher().constructor)
    })
  })
})
