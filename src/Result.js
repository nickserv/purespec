'use strict'

var indent = require('./indent')
var os = require('os')

const CHECK = '\u2713'
const CROSS = '\u2717'

module.exports = class Result {
  constructor (runnable, error, results) {
    this.runnable = runnable
    this.error = error
    this.results = results || []
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
