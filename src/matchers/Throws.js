'use strict'
var assert = require('assert')
var Result = require('../Result')

module.exports = class Throws {
  constructor (exception) {
    this.exception = exception
  }

  run (subject) {
    try {
      assert.throws(subject, this.exception)
      return new Result(this)
    } catch (err) {
      return new Result(this, err)
    }
  }

  toString () {
    return `throws ${this.exception}`
  }
}
