'use strict'

module.exports = class Given {
  constructor (args, matcher) {
    this.args = args
    this.matcher = matcher
  }

  run (subject) {
    this.matcher.run(() => subject.apply(null, this.args))
  }

  toString () {
    return `given ${this.args} ${this.matcher}`
  }
}
