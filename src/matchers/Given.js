const _ = require('lodash/fp')
const indent = require('../indent')
const NestedResult = require('../NestedResult')
const os = require('os')

module.exports = class Given {
  constructor (...args) {
    this.args = _.initial(args)
    this.matcher = _.last(args)
  }

  run (subject) {
    return Promise
      .resolve(this.matcher.run(_.partial(subject)(this.args)))
      .then(result => new NestedResult(this, [result]))
  }

  toString () {
    return `given ${this.args}`
  }

  toTree () {
    return this.toString() + os.EOL + indent(this.matcher.toString())
  }
}
