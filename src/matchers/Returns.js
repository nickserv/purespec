'use strict'
var deepEqual = require('deep-equal')
var Result = require('../Result')

module.exports = class Returns {
  constructor (result) {
    this.result = result
  }

  run (subject) {
    var isEqual = deepEqual(subject(), this.result, { strict: true })
    return new Result(this, !isEqual)
  }

  toString () {
    return `returns ${this.result}`
  }
}
