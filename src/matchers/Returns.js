const ComparisonResult = require('../results/ComparisonResult')

module.exports = class Returns {
  constructor (result) {
    this.result = result
  }

  run (subject) {
    return new ComparisonResult(this, subject(), this.result)
  }

  toString () {
    return `returns ${this.result}`
  }
}
