describe('Result', () => {
  describe('.prototype.constructor()', () => {
    context('given a runnable', () => {
      it('returns Result with runnable, empty results, and a falsy error')
    })

    context('given a runnable and passing results', () => {
      it('returns Result with runnable, results, and a falsy error')
    })

    context('given a runnable and failing results', () => {
      it('returns Result with runnable, results, and a truthy error')
    })

    context('given a runnable and an error', () => {
      it('returns Result with runnable, empty results, and error')
    })

    context('given a runnable and equivalent actual and expected options', () => {
      it('returns Result with runnable, actual, expected, and a falsy error')
    })

    context('given a runnable and nonequivalent actual and expected options', () => {
      it('returns Result with runnable, actual, expected, and a truthy error')
    })
  })

  describe('.prototype.toString()', () => {
    context('when there is an error', () => {
      it('returns a red String with a cross, its runnable, a newline, and its error')
    })

    context('when there is no error', () => {
      it('returns a green String with a check and its runnable')
    })
  })

  describe('.prototype.toTree()', () => {
    context('without results', () => {
      it('returns the result of .prototype.toString()')
    })

    context('with results', () => {
      it('returns its String representation with the indented representations of its children')
    })
  })
})
