const Result = require('../results/Result')
const ComparisonResult = require('../results/ComparisonResult')

module.exports = class Returns {
  constructor (result) {
    this.result = result
  }

  run (subject) {
    try {
      subject()
      return new ComparisonResult(this, subject(), this.result)
    } catch (error) {
      return new Result(this, error)
    }
  }

  toString () {
    return `returns ${this.result}`
  }
}
