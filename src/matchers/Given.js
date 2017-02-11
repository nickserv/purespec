var _ = require('lodash/fp')
var indent = require('../indent')
var os = require('os')
var Result = require('../Result')

module.exports = class Given {
  constructor (...args) {
    this.args = _.initial(args)
    this.matcher = _.last(args)
  }

  run (subject) {
    return Promise
      .resolve(this.matcher.run(_.partial(subject)(this.args)))
      .then(result => new Result(this, { results: [result] }))
  }

  toString () {
    return `given ${this.args}`
  }

  toTree () {
    return this.toString() + os.EOL + indent(this.matcher.toString())
  }
}
