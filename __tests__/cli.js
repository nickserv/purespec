describe('CLI', function () {
  beforeEach(function () {
    this.example = require('../src/example')
    this.example.run = jest.fn(this.example.run)

    process.argv[2] = 'src/example'
    console.log = jest.fn()
    this.cli = require('../src/cli')
  })

  it('runs the given file and prints its results', function () {
    return this.cli.then(() => {
      expect(this.example.run).toHaveBeenCalled()
      expect(console.log).toHaveBeenCalled()
    })
  })
})
