const purespec = require('..')

describe('indent()', () => {
  describe('given empty text', () => {
    it('returns whitespace for an indent', () => {
      expect(purespec.indent('')).toBe('  ')
    })
  })

  describe('given a line of text', () => {
    it('returns the indented line', () => {
      expect(purespec.indent('one')).toBe('  one')
    })
  })

  describe('given multiple lines of text', () => {
    it('returns a string with each line indented', () => {
      expect(purespec.indent('one\ntwo')).toBe('  one\n  two')
    })
  })

  describe('given an indented line of text', () => {
    it('returns the line indented again', () => {
      expect(purespec.indent('  one')).toBe('    one')
    })
  })
})
