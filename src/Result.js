const _ = require('lodash/core')
const chalk = require('chalk')
const indent = require('./indent')
const os = require('os')

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
        this.error = !_.isEqual(this.actual, this.expected)
      } else {
        this.error = this.results.some(result => result.error)
      }
    }
  }

  toString () {
    const status = this.error ? '✗' : '✓'
    const color = this.error ? 'red' : 'green'

    const item = chalk[color](`${status} ${this.runnable}`)
    return this.error ? item + os.EOL + this.error : item
  }

  toTree () {
    const indented = this.results.map(result => indent(result.toTree()))
    return [this.toString(), ...indented].join(os.EOL)
  }
}
