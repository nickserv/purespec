'use strict'

var chalk = require('chalk')
var deepEqual = require('deep-equal')
var indent = require('./indent')
var os = require('os')

module.exports = class Result {
  constructor (runnable, options) {
    options = options || {}
    this.runnable = runnable
    this.error = options.error
    this.results = options.results || []
    this.actual = options.actual
    this.expected = options.expected

    if (this.error === undefined) {
      if (this.actual !== undefined || this.expected !== undefined) {
        this.error = !deepEqual(this.actual, this.expected, { strict: true })
      } else {
        this.error = this.results.some(result => result.error)
      }
    }
  }

  toString () {
    var status = this.error ? '✗' : '✓'
    var color = this.error ? 'red' : 'green'

    var item = chalk[color](`${status} ${this.runnable}`)
    return this.error ? item + os.EOL + this.error : item
  }

  toTree () {
    var indented = this.results.map(result => indent(result.toTree()))
    return [this.toString()].concat(indented).join(os.EOL)
  }
}
