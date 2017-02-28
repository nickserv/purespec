console.log = jest.fn()
const path = require('path')

describe('CLI', () => {
  const cli = '../src/cli'

  beforeEach(() => {
    jest.resetAllMocks().resetModules()
    process.argv = [
      process.execPath,
      path.resolve(cli),
      'example.js'
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
      process.argv[3] = 'example.js'

      return require(cli)
        .then(() => expect(console.log).toHaveBeenCalledTimes(2))
    })
  })

  describe('given a failing module', () => {
    it('prints an error and exits with a non-zero status')
  })

  describe('given an invalid module', () => {
    it('throws an error', () => {
      process.argv[2] = ''

      expect(() => require(cli)).toThrow()
    })
  })
})
