describe('indent()', () => {
  describe('given empty text', () => {
    it('returns whitespace for an indent', () => {
      assert.strictEqual(purespec.indent(''), '  ')
    })
  })

  describe('given a line of text', () => {
    it('returns the indented line', () => {
      assert.strictEqual(purespec.indent('one'), '  one')
    })
  })

  describe('given multiple lines of text', () => {
    it('returns a string with each line indented', () => {
      assert.strictEqual(purespec.indent('one\ntwo'), '  one\n  two')
    })
  })

  describe('given an indented line of text', () => {
    it('returns the line indented again', () => {
      assert.strictEqual(purespec.indent('  one'), '    one')
    })
  })
})
