import assert from 'assert'

export default class Throws {
  constructor (exception) {
    this.exception = exception
  }

  run (subject) {
    assert.throws(subject, this.exception)
  }

  toString () {
    return `throws ${this.exception}`
  }
}
