const Result = require('../Result')

module.exports = class Throws {
  constructor (exception) {
    this.exception = exception
  }

  run (subject) {
    try {
      subject()
      return new Result(this, { error: true })
    } catch (err) {
      return new Result(this, { actual: err, expected: new Error(this.exception) })
    }
  }

  toString () {
    return `throws ${this.exception}`
  }
}
