'use strict'
var indent = require('../indent')
var os = require('os')
var Result = require('../Result')

module.exports = class Given {
  constructor (...args) {
    this.matcher = args.pop()
    this.args = args
  }

  run (subject) {
    return Promise
      .resolve(this.matcher.run(() => subject.apply(null, this.args)))
      .then(result => new Result(this, { results: [result] }))
  }

  toString () {
    return `given ${this.args}`
  }

  toTree () {
    var indented = indent(this.matcher.toString())
    return [this.toString()].concat(indented).join(os.EOL)
  }
}
