const ComparisonResult = require('../ComparisonResult')
const Result = require('../Result')
const _ = require('lodash/fp')

module.exports = class Rejects {
  /* eslint-disable fp/no-nil */
  constructor (reason) {
    this.reason = reason
  }
  /* eslint-enable */

  run (subject) {
    return new Promise(resolve => resolve(subject()))
      .then(actual => new Result(this, true))
      .catch(reason => {
        const error = _.isError(reason) ? reason : new Error(reason)
        return new ComparisonResult(this, error, new Error(this.reason))
      })
  }

  toString () {
    return `rejects with ${this.reason}`
  }
}
