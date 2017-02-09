console.log = jest.fn()

describe('CLI', function () {
  beforeEach(function () {
    jest.resetModules()
    this.cli = '../src/cli'
  })

  describe('given a valid module', function () {
    beforeEach(function () {
      this.example = require('../src/example')
      this.example.run = jest.fn(this.example.run)

      process.argv[2] = 'src/example'
    })

    it('runs the given module and prints its results', function () {
      return require(this.cli).then(() => {
        expect(this.example.run).toHaveBeenCalled()
        expect(console.log).toHaveBeenCalled()
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
