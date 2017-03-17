const indent = require('../indent')
const NestedResult = require('../NestedResult')
const os = require('os')

module.exports = class Test {
  constructor (name, subject, ...runnables) {
    this.name = name
    this.subject = subject
    this.runnables = runnables
  }

  run () {
    const promises = this.runnables.map(runnable =>
      new Promise(resolve => resolve(runnable.run(this.subject)))
    )

    return Promise
      .all(promises)
      .then(results => new NestedResult(this, results))
  }

  toString () {
    return this.name
  }

  toTree () {
    const indented = this.runnables.map(runnable => {
      const method = runnable.toTree ? 'toTree' : 'toString'
      return indent(runnable[method]())
    })
    return [this.toString(), ...indented].join(os.EOL)
  }
}
