describe('dsl', () => {
  describe('()', () => {
    context('without a target', () => {
      var oldGlobal = global
      before(() => { global = {} }) // eslint-disable-line
      after(() => { global = oldGlobal }) // eslint-disable-line

      it('assigns properties to the global object', () => {
        purified.dsl()
        assert(Object.keys(global).length)
      })
    })

    context('given a target', () => {
      var target = {}

      it('assigns properties to the given target', () => {
        purified.dsl(target)
        assert(Object.keys(target).length)
      })
    })
  })

  describe('.matchers()', () => {
    it('returns an Object of matcher shortcuts', () => {
      var matchers = Object.keys(purified.matchers)
                           .map(key => purified.matchers[key])
      var dslMatchers = purified.dsl.matchers()
      assert(typeof dslMatchers === 'object')
      assert.notEqual(Object.keys(dslMatchers).length, 0)
      Object.keys(dslMatchers).forEach(key => {
        assert(matchers.some(matcher =>
          matcher === dslMatchers[key]().constructor))
      })
    })
  })

  describe('.test()', () => {
    it('returns a new Test using the given constructor arguments', () => {
      var name = 'name'
      function subject () {}
      var given = new purified.matchers.Given()
      var returns = new purified.matchers.Returns()

      var test = new purified.Test(name, subject, [given, returns])
      assert.deepEqual(purified.dsl.test(name, subject, given, returns), test)
    })
  })
})
