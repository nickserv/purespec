describe('dsl', () => {
  describe('()', () => {
    context('without a target', () => {
      var oldGlobal = global
      before(() => { global = {} }) // eslint-disable-line
      after(() => { global = oldGlobal }) // eslint-disable-line

      it('assigns properties to the global object', () => {
        purespec.dsl()
        assert(Object.keys(global).length)
      })
    })

    context('given a target', () => {
      var target = {}

      it('assigns properties to the given target', () => {
        purespec.dsl(target)
        assert(Object.keys(target).length)
      })
    })
  })

  describe('.matchers()', () => {
    it('returns an Object of matcher shortcuts', () => {
      var matchers = Object.keys(purespec.matchers)
                           .map(key => purespec.matchers[key])
      var dslMatchers = purespec.dsl.matchers()
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
      var given = new purespec.matchers.Given()
      var returns = new purespec.matchers.Returns()

      var test = new purespec.Test(name, subject, [given, returns])
      assert.deepEqual(purespec.dsl.test(name, subject, given, returns), test)
    })
  })
})
