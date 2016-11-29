'use strict'

var deepEqual = require('deep-equal')
var indent = require('./indent')
var os = require('os')

const CHECK = '\u2713'
const CROSS = '\u2717'

module.exports = class Result {
  constructor (runnable, options) {
    options = options || {}
    this.runnable = runnable
    this.error = options.error
    this.results = options.results || []
    this.actual = options.actual
    this.expected = options.expected

    if (this.error === undefined && (this.actual !== undefined || this.expected !== undefined)) {
      this.error = !deepEqual(this.actual, this.expected, { strict: true })
    }
  }

  isErroring () {
    return Boolean(this.error || this.results.some(result => result.isErroring()))
  }

  toString () {
    var status = this.isErroring() ? CROSS : CHECK
    return `${status} ${this.runnable}`
  }

  toTree () {
    var indented = this.results.map(result => indent(result.toTree()))
    return [this.toString()].concat(indented).join(os.EOL)
  }
}
