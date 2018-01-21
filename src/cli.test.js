console.error = jest.fn()
console.log = jest.fn()
const path = require('path')

describe('CLI', () => {
  const cli = './cli'

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
      return require(cli).then(() => {
        expect(console.log).toHaveBeenCalled()
        expect(process.exitCode).toBeUndefined()
      })
    })
  })

  describe('given multiple valid modules', () => {
    it('prints their results', () => {
      process.argv[3] = 'examples/round.js'

      return require(cli).then(() => {
        expect(console.log).toHaveBeenCalledTimes(2)
        expect(process.exitCode).toBeUndefined()
      })
    })
  })

  describe('given a failing module', () => {
    it('prints its results', () => {
      process.argv[3] = 'examples/failing.js'

      return require(cli).then(() => {
        expect(console.log).toHaveBeenCalledTimes(2)
        expect(process.exitCode).toBe(1)
      })
    })
  })

  describe('given an invalid module', () => {
    it('prints an error and exits with a non-zero status', () => {
      process.argv[2] = ''

      return require(cli).then(() => {
        expect(console.error).toHaveBeenCalled()
        expect(process.exitCode).toBe(1)
      })
    })
  })
})
