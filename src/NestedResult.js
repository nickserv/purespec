const _ = require('lodash/fp')
const indent = require('./indent')
const os = require('os')
const Result = require('./Result')

module.exports = class NestedResult extends Result {
  /* eslint-disable fp/no-nil */
  constructor (runnable, results = []) {
    super(runnable, _.some('error')(results) || undefined) // eslint-disable-line fp/no-unused-expression
    this.results = results
  }
  /* eslint-enable */

  toTree () {
    const indented = this.results.map(result => indent(result.toTree()))
    return [this.toString(), ...indented].join(os.EOL)
  }
}
