const indent = require('../indent')
const NestedResult = require('../results/NestedResult')
const os = require('os')

module.exports = class NestedMatcher {
  constructor (...runnables) {
    this.runnables = runnables
  }

  run (subject) {
    const promises = this.runnables.map(runnable => runnable.run(subject))

    return Promise
      .all(promises)
      .then(results => new NestedResult(this, results))
  }

  toTree () {
    const indented = this.runnables.map(runnable => {
      const method = runnable.toTree ? 'toTree' : 'toString'
      return indent(runnable[method]())
    })
    return [this.toString(), ...indented].join(os.EOL)
  }
}
