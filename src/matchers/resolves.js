const ComparisonResult = require('../ComparisonResult')

module.exports = class Resolves {
  /* eslint-disable fp/no-nil */
  constructor (result) {
    this.result = result
  }
  /* eslint-enable */

  run (subject) {
    return subject().then(actual => {
      return new ComparisonResult(this, actual, this.result)
    })
  }

  toString () {
    return `resolves with ${this.result}`
  }
}
