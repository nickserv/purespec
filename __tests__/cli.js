console.error = jest.fn()
console.log = jest.fn()
process.exit = jest.fn()
const path = require('path')

describe('CLI', () => {
  const cli = '../src/cli'

  beforeEach(() => {
    jest.resetAllMocks().resetModules()
    process.argv = [
      process.execPath,
      path.resolve(cli),
      'examples/round.js'
    ]
  })

  describe('given a valid module', () => {
    it('prints its results', () => {
      return require(cli)
        .then(() => expect(console.log).toHaveBeenCalled())
    })
  })

  describe('given multiple valid modules', () => {
    it('prints their results', () => {
      process.argv[3] = 'examples/round.js'

      return require(cli)
        .then(() => expect(console.log).toHaveBeenCalledTimes(2))
    })
  })

  describe('given a failing module', () => {
    it('prints an error and exits with a non-zero status', () => {
      process.argv[3] = 'examples/failing.js'

      return require(cli).then(() => {
        expect(console.error).toHaveBeenCalled()
        expect(process.exit).toHaveBeenCalled()
      })
    })
  })

  describe('given an invalid module', () => {
    it('throws an error', () => {
      process.argv[2] = ''

      expect(() => require(cli)).toThrow('ENOENT')
    })
  })
})
