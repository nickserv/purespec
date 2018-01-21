const ComparisonResult = require('../results/ComparisonResult')
const Result = require('../results/Result')
const Resolves = require('./Resolves')

describe('Resolves matcher', () => {
  const resolves = new Resolves('Hello, World!')

  describe('.prototype.constructor()', () => {
    it('returns a new Resolves with the given result', () => {
      expect(resolves.result).toBe('Hello, World!')
    })
  })

  describe('.prototype.run()', () => {
    describe('given subject that throws', () => {
      it('returns a failing result', () => {
        const subject = () => { throw new Error('Missing name') }

        expect(resolves.run(subject)).toEqual(new Result(resolves, new Error('Missing name')))
      })
    })

    describe('given subject that rejects', () => {
      it('returns a failing test', () => {
        const subject = () => Promise.reject(new Error('Missing name'))

        return expect(resolves.run(subject)).resolves.toEqual(new Result(
          resolves,
          new Error('Missing name')
        ))
      })
    })

    describe('given subject that returns', () => {
      it('runs its subject as a Promise, asserting its actual result equals its expected result', () => {
        const subject = () => new Promise(setTimeout).then(() => 'Hello, World!')

        return expect(resolves.run(subject)).resolves.toEqual(new ComparisonResult(
          resolves,
          'Hello, World!',
          'Hello, World!'
        ))
      })
    })
  })

  describe('.prototype.toString()', () => {
    it('returns a String representation with its result', () => {
      expect(resolves.toString()).toBe('resolves with Hello, World!')
    })
  })
})
