describe('indent()', () => {
  context('given empty text', () => {
    it('returns whitespace for an indent', () => {
      expect(purespec.indent('')).to.equal('  ')
    })
  })

  context('given a line of text', () => {
    it('returns the indented line', () => {
      expect(purespec.indent('one')).to.equal('  one')
    })
  })

  context('given multiple lines of text', () => {
    it('returns a string with each line indented', () => {
      expect(purespec.indent('one\ntwo')).to.equal('  one\n  two')
    })
  })

  context('given an indented line of text', () => {
    it('returns the line indented again', () => {
      expect(purespec.indent('  one')).to.equal('    one')
    })
  })
})
