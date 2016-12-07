/* eslint-env mocha */

describe('purified', () => {
  describe('.Test', () => {
    describe('.prototype.constructor()', () => {
      it('returns a new Test with the given data')
    })

    describe('.prototype.run()', () => {
      context('with passing runnables', () => {
        it('returns a Promise of the Test\'s Result')
      })

      context('with failing runnables', () => {
        it('returns a Promise that prints errors and exits the process')
      })
    })

    describe('.prototype.toString()', () => {
      it('returns a nested String of the Test and its runnables')
    })
  })

  describe('.dsl', () => {
    describe('()', () => {
      context('given a target', () => {
        it('assigns properties to the target')
      })

      context('given no target', () => {
        it('assigns properties to the global object')
      })
    })

    describe('.matchers()', () => {
      it('returns an Object of matcher shortcuts')
    })

    describe('.test()', () => {
      it('returns a new Test using the given constructor arguments')
    })
  })

  describe('.indent()', () => {
    context('given empty text', () => {
      it('returns whitespace for an indent')
    })

    context('given a line of text', () => {
      it('returns the indented line')
    })

    context('given multiple lines of text', () => {
      it('returns a string with each line indented')
    })

    context('given an indented line of text', () => {
      it('returns the line indented again')
    })
  })

  describe('.matchers', () => {
    it('has tests')
  })
})

describe('example', () => {
  it('constructs a Test')

  it('prints the Test')

  it('runs the Test')
})
