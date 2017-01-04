/* eslint-env mocha */
describe('indent()', () => {
  context('given empty text', () => {
    it('returns whitespace for an indent', () => {
      assert.strictEqual(purified.indent(''), '  ')
    })
  })

  context('given a line of text', () => {
    it('returns the indented line', () => {
      assert.strictEqual(purified.indent('one'), '  one')
    })
  })

  context('given multiple lines of text', () => {
    it('returns a string with each line indented', () => {
      assert.strictEqual(purified.indent('one\ntwo'), '  one\n  two')
    })
  })

  context('given an indented line of text', () => {
    it('returns the line indented again', () => {
      assert.strictEqual(purified.indent('  one'), '    one')
    })
  })
})
