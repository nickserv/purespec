const Test = require('./Test')

module.exports = class Required extends Test {
  constructor (name, ...runnables) {
    super(require(name), ...runnables)
    this.name = name
  }

  toString () {
    return this.name
  }
}
