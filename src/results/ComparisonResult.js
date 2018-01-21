const Result = require('./Result')
const deepEqual = require('deep-equal')

module.exports = class ComparisonResult extends Result {
  constructor (runnable, actual, expected) {
    super(runnable, !deepEqual(actual, expected, { strict: true }) || undefined)
    this.actual = actual
    this.expected = expected
  }
}
