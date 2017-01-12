describe('dsl', () => {
  describe('()', () => {
    context('without a target', () => {
      var oldGlobal = global
      before(() => { global = {} }) // eslint-disable-line
      after(() => { global = oldGlobal }) // eslint-disable-line

      it('assigns properties to the global object', () => {
        purespec.dsl()
        expect(Object.keys(global)).not.to.be.empty
      })
    })

    context('given a target', () => {
      var target = {}

      it('assigns properties to the given target', () => {
        purespec.dsl(target)
        expect(Object.keys(target)).not.to.be.empty
      })
    })
  })

  describe('.matchers()', () => {
    it('returns an Object of matcher shortcuts', () => {
      var matchers = Object.keys(purespec.matchers)
                           .map(key => purespec.matchers[key])
      var dslMatchers = purespec.dsl.matchers()
      expect(dslMatchers).to.be.instanceof(Object)
      expect(Object.keys(dslMatchers)).not.to.be.empty
      Object.keys(dslMatchers).forEach(key => {
        expect(matchers.some(matcher =>
          matcher === dslMatchers[key]().constructor)).to.be.true
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
      expect(purespec.dsl.test(name, subject, given, returns)).to.deep.equal(test)
    })
  })
})
