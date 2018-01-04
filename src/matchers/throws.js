const ComparisonResult = require('../ComparisonResult')
const Result = require('../Result')

module.exports = class Throws {
  /* eslint-disable fp/no-nil */
  constructor (exception) {
    this.exception = exception
  }

  run (subject) {
    try {
      subject() // eslint-disable-line fp/no-unused-expression
      return new Result(this, true)
    } catch (err) {
      return new ComparisonResult(this, err, new Error(this.exception))
    }
  }
  /* eslint-enable */

  toString () {
    return `throws ${this.exception}`
  }
}
