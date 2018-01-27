const { green, red } = require('chalk')
const { EOL } = require('os')

module.exports = class Result {
  constructor (matcher, error) {
    this.matcher = matcher
    this.error = error
  }

  toString () {
    const status = this.error ? '✗' : '✓'
    const color = this.error ? red : green

    const item = color(`${status} ${this.matcher}`)
    return this.error ? item + EOL + this.error : item
  }

  toTree () {
    return this.toString()
  }
}
