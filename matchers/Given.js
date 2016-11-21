'use strict'

module.exports = class Given {
  constructor (args, matcher) {
    this.args = args
    this.matcher = matcher
  }

  match (subject) {
    this.matcher.match(() => subject.apply(null, this.args))
  }

  toString () {
    return `given ${this.args} ${this.matcher}`
  }
}
