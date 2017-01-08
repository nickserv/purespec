'use strict'
var indent = require('./indent')
var os = require('os')

module.exports = class Test {
  constructor (name, subject, runnables) {
    this.name = name
    this.subject = subject
    this.runnables = runnables
  }

  run () {
    var promises = this.runnables.map(runnable =>
      new Promise(resolve => resolve(runnable.run(this.subject)))
    )
    return Promise.all(promises).catch(reason => {
      console.error(reason instanceof Error ? reason.message : reason)
      process.exit(1)
    })
  }

  toString () {
    var indented = this.runnables.map(runnable => indent(runnable.toString()))
    return [this.name].concat(indented).join(os.EOL)
  }
}
