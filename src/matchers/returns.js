const ComparisonResult = require('../ComparisonResult')

module.exports = class Returns {
  /* eslint-disable fp/no-nil */
  constructor (result) {
    this.result = result
  }
  /* eslint-enable */

  run (subject) {
    return new ComparisonResult(this, subject(), this.result)
  }

  toString () {
    return `returns ${this.result}`
  }
}
