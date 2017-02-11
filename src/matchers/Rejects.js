var Result = require('../Result')
var _ = require('lodash/fp')

module.exports = class Rejects {
  constructor (reason) {
    this.reason = reason
  }

  run (subject) {
    return subject()
      .then(actual => new Result(this, { error: true }))
      .catch(reason => {
        var error = _.isError(reason) ? reason : new Error(reason)
        return new Result(this, { actual: error, expected: new Error(this.reason) })
      })
  }

  toString () {
    return `rejects with ${this.reason}`
  }
}
