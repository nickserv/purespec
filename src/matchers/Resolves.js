'use strict'
var assert = require('assert')
var Result = require('../Result')

module.exports = class Resolves {
  constructor (result) {
    this.result = result
  }

  run (subject) {
    return subject().then(actual => {
      try {
        assert.deepStrictEqual(actual, this.result)
        return new Result(this)
      } catch (err) {
        return new Result(this, err)
      }
    })
  }

  toString () {
    return `resolves with ${this.result}`
  }
}
