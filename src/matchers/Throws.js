const ComparisonResult = require('../results/ComparisonResult')
const Matcher = require('./Matcher')
const Result = require('../results/Result')

module.exports = class Throws extends Matcher {
  constructor (exception) {
    super()
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
