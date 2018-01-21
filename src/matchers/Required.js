const Test = require('./Test')
const importCwd = require('import-cwd')

module.exports = class Required extends Test {
  constructor (name, ...runnables) {
    super(name && importCwd(name), ...runnables)
    this.name = name
  }

  toString () {
    return this.name
  }
}
