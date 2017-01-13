describe('indent()', function () {
  context('given empty text', function () {
    it('returns whitespace for an indent', function () {
      expect(purespec.indent('')).to.equal('  ')
    })
  })

  context('given a line of text', function () {
    it('returns the indented line', function () {
      expect(purespec.indent('one')).to.equal('  one')
    })
  })

  context('given multiple lines of text', function () {
    it('returns a string with each line indented', function () {
      expect(purespec.indent('one\ntwo')).to.equal('  one\n  two')
    })
  })

  context('given an indented line of text', function () {
    it('returns the line indented again', function () {
      expect(purespec.indent('  one')).to.equal('    one')
    })
  })
})
