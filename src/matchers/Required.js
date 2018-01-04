const Test = require('./Test')

module.exports = class Required extends Test {
  constructor (name, ...runnables) {
    super(name, require(name), ...runnables)
  }
}
