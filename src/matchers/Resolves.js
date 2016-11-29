'use strict'
var deepEqual = require('deep-equal')
var Result = require('../Result')

module.exports = class Resolves {
  constructor (result) {
    this.result = result
  }

  run (subject) {
    return subject().then(actual => {
      var isEqual = deepEqual(actual, this.result, { strict: true })
      return new Result(this, !isEqual)
    })
  }

  toString () {
    return `resolves with ${this.result}`
  }
}
