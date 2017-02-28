var purespec = require('..')
var _ = require('lodash/fp')

describe('dsl', function () {
  it('is a non-empty Object', function () {
    expect(purespec.dsl).toBeInstanceOf(Object)
    expect(purespec.dsl).not.toEqual({})
  })

  it('includes matcher shortcuts', function () {
    var matchers = _.values(purespec.matchers)
    _.forEach(purespec.dsl)(dslMatcher => {
      expect(matchers).toContain(dslMatcher().constructor)
    })
  })
})
