const ComparisonResult = require('../ComparisonResult')

module.exports = class Resolves {
  constructor (result) {
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
