const Result = require('./Result')
const deepEqual = require('deep-equal')

module.exports = class ComparisonResult extends Result {
  constructor (matcher, actual, expected) {
    super(matcher, !deepEqual(actual, expected, { strict: true }) || undefined)
    this.actual = actual
    this.expected = expected
  }
}
