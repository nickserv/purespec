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

  it('includes a test function that returns a new Test using the given constructor arguments', function () {
    var name = 'name'
    function subject () {}
    var given = new purespec.matchers.Given()
    var returns = new purespec.matchers.Returns()

    var test = new purespec.Test(name, subject, [given, returns])
    expect(purespec.dsl.test(name, subject, given, returns)).toEqual(test)
  })
})
