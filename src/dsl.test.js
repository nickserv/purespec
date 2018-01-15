const purespec = require('..')
const _ = require('lodash/fp')

describe('dsl', () => {
  it('is a non-empty Object', () => {
    expect(purespec.dsl).toBeInstanceOf(Object)
    expect(purespec.dsl).not.toEqual({})
  })

  it('includes matcher shortcuts', () => {
    const matchers = _.values(purespec.matchers)
    _.forEach(purespec.dsl)(dslMatcher => {
      expect(matchers).toContain(dslMatcher().constructor)
    })
  })
})
