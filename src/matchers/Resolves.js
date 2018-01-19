const ComparisonResult = require('../results/ComparisonResult')
const Matcher = require('./Matcher')
const Result = require('../results/Result')

module.exports = class Resolves extends Matcher {
  constructor (result) {
    super()
    this.result = result
  }

  run (subject) {
    try {
      return subject()
        .then(actual => new ComparisonResult(this, actual, this.result))
        .catch(reason => new Result(this, reason))
    } catch (error) {
      return new Result(this, error)
    }
  }

  toString () {
    return `resolves with ${this.result}`
  }
}
