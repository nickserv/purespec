'use strict'
var deepEqual = require('deep-equal')
var Result = require('../Result')

module.exports = class Rejects {
  constructor (reason) {
    this.reason = reason
  }

  run (subject) {
    return subject()
      .then(actual => new Result(this, true))
      .catch(reason => {
        var error = reason instanceof Error ? reason : new Error(reason)
        var isEqual = deepEqual(error, new Error(this.reason), { strict: true })
        return new Result(this, !isEqual)
      })
  }

  toString () {
    return `rejects with ${this.reason}`
  }
}
