const ComparisonResult = require('../results/ComparisonResult')
const Matcher = require('./Matcher')

module.exports = class Resolves extends Matcher {
  constructor (result) {
    super()
    this.result = result
  }

  run (subject) {
    return subject().then(actual => {
      return new ComparisonResult(this, actual, this.result)
    })
  }

  toString () {
    return `resolves with ${this.result}`
  }
}
