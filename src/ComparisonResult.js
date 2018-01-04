const _ = require('lodash/fp')
const Result = require('./Result')

module.exports = class ComparisonResult extends Result {
  constructor (runnable, actual, expected) {
    super(runnable, !_.isEqual(actual)(expected) || undefined)
    this.actual = actual
    this.expected = expected
  }
}
