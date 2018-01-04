const _ = require('lodash/fp')
const Result = require('./Result')

module.exports = class ComparisonResult extends Result {
  /* eslint-disable fp/no-nil */
  constructor (runnable, actual, expected) {
    super(runnable, !_.isEqual(actual)(expected) || undefined) // eslint-disable-line fp/no-unused-expression
    this.actual = actual
    this.expected = expected
  }
  /* eslint-enable */
}
