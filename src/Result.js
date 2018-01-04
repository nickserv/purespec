const chalk = require('chalk')
const os = require('os')

module.exports = class Result {
  /* eslint-disable fp/no-nil */
  constructor (runnable, error) {
    this.runnable = runnable
    this.error = error
  }
  /* eslint-enable */

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
