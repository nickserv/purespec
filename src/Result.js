const chalk = require('chalk')
const os = require('os')

module.exports = class Result {
  constructor (runnable, error) {
    this.runnable = runnable
    this.error = error
  }

  toString () {
    const status = this.error ? '✗' : '✓'
    const color = this.error ? 'red' : 'green'

    const item = chalk[color](`${status} ${this.runnable}`)
    return this.error ? item + os.EOL + this.error : item
  }

  toTree () {
    return this.toString()
  }
}
