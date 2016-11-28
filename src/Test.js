'use strict'
var indent = require('./indent')
var os = require('os')
var Result = require('./Result')

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

    return Promise
      .all(promises)
      .then(results => new Result(this, null, results))
  }

  toString () {
    return this.name
  }

  toTree () {
    var indented = this.runnables.map(runnable => {
      var method = runnable.toTree ? 'toTree' : 'toString'
      return indent(runnable[method]())
    })
    return [this.toString()].concat(indented).join(os.EOL)
  }
}
