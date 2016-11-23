'use strict'
var assert = require('assert')

module.exports = class Resolves {
  constructor (result) {
    this.result = result
  }

  run (subject) {
    return subject().then(actual => assert.deepStrictEqual(actual, this.result))
  }

  toString () {
    return `resolves with ${this.result}`
  }
}
