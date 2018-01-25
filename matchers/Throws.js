const ComparisonResult = require('../results/ComparisonResult')
const Result = require('../results/Result')

module.exports = class Throws {
  constructor (exception) {
    this.exception = exception
  }

  run (subject) {
    try {
      subject()
      return new Result(this, true)
    } catch (err) {
      return new ComparisonResult(this, err, new Error(this.exception))
    }
  }

  toString () {
    return `throws ${this.exception}`
  }
}
