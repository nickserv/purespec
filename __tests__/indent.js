var purespec = require('..')

describe('indent()', function () {
  describe('given empty text', function () {
    it('returns whitespace for an indent', function () {
      expect(purespec.indent('')).toBe('  ')
    })
  })

  describe('given a line of text', function () {
    it('returns the indented line', function () {
      expect(purespec.indent('one')).toBe('  one')
    })
  })

  describe('given multiple lines of text', function () {
    it('returns a string with each line indented', function () {
      expect(purespec.indent('one\ntwo')).toBe('  one\n  two')
    })
  })

  describe('given an indented line of text', function () {
    it('returns the line indented again', function () {
      expect(purespec.indent('  one')).toBe('    one')
    })
  })
})
