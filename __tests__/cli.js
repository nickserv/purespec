console.log = jest.fn()
var path = require('path')

describe('CLI', function () {
  beforeEach(function () {
    jest.resetAllMocks().resetModules()
    this.cli = '../src/cli'
    process.argv = [
      process.execPath,
      path.resolve(this.cli),
      'example.js'
    ]
  })

  describe('given a valid module', function () {
    it('prints its results', function () {
      return require(this.cli).then(() => {
        expect(console.log).toHaveBeenCalled()
      })
    })
  })

  describe('given multiple valid modules', function () {
    beforeEach(function () {
      process.argv[3] = 'example.js'
    })

    it('prints their results', function () {
      return require(this.cli).then(() => {
        expect(console.log).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe('given an invalid module', function () {
    beforeEach(function () {
      process.argv[2] = ''
    })

    it('throws an error', function () {
      expect(() => require(this.cli)).toThrow()
    })
  })
})
