'use strict'
var Result = require('../Result')

module.exports = class Rejects {
  constructor (reason) {
    this.reason = reason
  }

  run (subject) {
    return subject()
      .then(actual => new Result(this, { error: true }))
      .catch(reason => {
        var error = reason instanceof Error ? reason : new Error(reason)
        return new Result(this, { actual: error, expected: new Error(this.reason) })
      })
  }

  toString () {
    return `rejects with ${this.reason}`
  }
}
