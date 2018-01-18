const ComparisonResult = require('../results/ComparisonResult')
const Matcher = require('./Matcher')

module.exports = class Returns extends Matcher {
  constructor (result) {
    super()
    this.result = result
  }

  run (subject) {
    return new ComparisonResult(this, subject(), this.result)
  }

  toString () {
    return `returns ${this.result}`
  }
}
