const indent = require('../indent')
const NestedResult = require('../results/NestedResult')
const { EOL } = require('os')

module.exports = class Nested {
  constructor (...matchers) {
    this.matchers = matchers
  }

  run (subject) {
    const promises = this.matchers.map(matcher => matcher.run(subject))

    return Promise
      .all(promises)
      .then(results => new NestedResult(this, results))
  }

  toTree () {
    const indented = this.matchers.map(matcher => {
      const method = matcher.toTree ? 'toTree' : 'toString'
      return indent(matcher[method]())
    })
    return [this.toString(), ...indented].join(EOL)
  }
}
