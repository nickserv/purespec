const Test = require('./Test')

module.exports = class Required extends Test {
  constructor (name, ...runnables) {
    const subject = require(require.resolve(name, { paths: [process.cwd()] }))
    super(subject, ...runnables)
    this.name = name
  }

  toString () {
    return this.name
  }
}
