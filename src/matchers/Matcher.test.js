const purespec = require('..')

describe('Matcher matcher', () => {
  const matcher = new purespec.matchers.Matcher()

  describe('.prototype.run()', () => {
    describe('given subject that throws', () => {
      it('returns a failing result', () => {
        const subject = () => { throw new Error('Missing name') }

        expect(matcher.run(subject)).toEqual(new purespec.results.Result(matcher, new Error('Missing name')))
      })
    })

    describe('given subject that returns', () => {
      it('returns a passing result', () => {
        const subject = () => 'Hello, World!'

        expect(matcher.run(subject)).toEqual(new purespec.results.Result(matcher))
      })
    })
  })
})
