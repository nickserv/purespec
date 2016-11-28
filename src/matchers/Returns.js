'use strict'
var assert = require('assert')
var Result = require('../Result')

module.exports = class Returns {
  constructor (result) {
    this.result = result
  }

  run (subject) {
    try {
      assert.deepStrictEqual(subject(), this.result)
      return new Result(this)
    } catch (err) {
      return new Result(this, err)
    }
  }

  toString () {
    return `returns ${this.result}`
  }
}
