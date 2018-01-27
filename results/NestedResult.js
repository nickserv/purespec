const indent = require('../indent')
const { EOL } = require('os')
const Result = require('./Result')

module.exports = class NestedResult extends Result {
  constructor (matcher, results = []) {
    super(matcher, results.some(result => result.error) || undefined)
    this.results = results
  }

  toTree () {
    const indented = this.results.map(result => indent(result.toTree()))
    return [this.toString(), ...indented].join(EOL)
  }
}
