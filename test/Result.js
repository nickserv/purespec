describe('Result', () => {
  describe('.prototype.constructor()', () => {
    context('given a runnable', () => {
      it('returns a new Result with the given runnable, empty results, and a falsy error')
    })

    context('given a runnable and results', () => {
      context('when the results are passing', () => {
        it('returns a new Result with the given runnable, results, and a falsy error')
      })

      context('when the results are failing', () => {
        it('returns a new Result with the given runnable, results, and a truthy error')
      })
    })

    context('given a runnable and an error', () => {
      it('returns a new Result with the given runnable, empty results, and the given error')
    })

    context('given a runnable and an actual or expected option', () => {
      context('when the actual and expected option are deeply equal', () => {
        it('returns a new Result with the given runnable, actual, expected, and a falsy error')
      })

      context('when the actual and expected option are not deeply equal', () => {
        it('returns a new Result with the given runnable, actual, expected, and a truthy error')
      })
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
