var purespec = require('..')
var _ = require('lodash/core')

describe('dsl', function () {
  describe('()', function () {
    var target = {}

    it('assigns properties to the given target', function () {
      purespec.dsl(target)
      expect(target).not.toEqual({})
    })
  })

  describe('.matchers()', function () {
    it('returns an Object of matcher shortcuts', function () {
      var dslMatchers = purespec.dsl.matchers()
      expect(dslMatchers).toBeInstanceOf(Object)
      expect(dslMatchers).not.toEqual({})

      var matchers = _.values(purespec.matchers)
      _.values(dslMatchers).forEach(dslMatcher => {
        expect(matchers).toContain(dslMatcher().constructor)
      })
    })
  })

  describe('.test()', function () {
    it('returns a new Test using the given constructor arguments', function () {
      var name = 'name'
      function subject () {}
      var given = new purespec.matchers.Given()
      var returns = new purespec.matchers.Returns()

      var test = new purespec.Test(name, subject, [given, returns])
      expect(purespec.dsl.test(name, subject, given, returns)).toEqual(test)
    })
  })
})
