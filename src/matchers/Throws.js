'use strict'
var deepEqual = require('deep-equal')
var Result = require('../Result')

module.exports = class Throws {
  constructor (exception) {
    this.exception = exception
  }

  run (subject) {
    try {
      subject()
      return new Result(this, true)
    } catch (err) {
      var isEqual = deepEqual(err, new Error(this.exception), { strict: true })
      return new Result(this, !isEqual)
    }
  }

  toString () {
    return `throws ${this.exception}`
  }
}
