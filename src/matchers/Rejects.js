'use strict'
var assert = require('assert')
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
        try {
          assert.deepStrictEqual(error, new Error(this.reason))
          return new Result(this)
        } catch (assertionError) {
          return new Result(this, true)
        }
      })
  }

  toString () {
    return `rejects with ${this.reason}`
  }
}
