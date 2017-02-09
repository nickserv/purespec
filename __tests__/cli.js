console.log = jest.fn()
var path = require('path')

describe('CLI', function () {
  beforeEach(function () {
    jest.resetAllMocks().resetModules()
    this.cli = '../src/cli'
    this.example = require('../src/example')
    this.example.run = jest.fn(this.example.run)
    process.argv = [
      process.execPath,
      path.resolve(this.cli),
      'src/example'
    ]
  })

  describe('given a valid module', function () {
    it('runs the given module and prints its results', function () {
      return require(this.cli).then(() => {
        expect(this.example.run).toHaveBeenCalled()
        expect(console.log).toHaveBeenCalled()
      })
    })
  })

  describe('given multiple valid modules', function () {
    beforeEach(function () {
      process.argv[3] = 'src/example'
    })

    it('runs the given modules and prints their results', function () {
      return require(this.cli).then(() => {
        expect(this.example.run).toHaveBeenCalledTimes(2)
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
