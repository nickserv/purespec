var Result = require('../Result')

module.exports = class Resolves {
  constructor (result) {
    this.result = result
  }

  run (subject) {
    return subject().then(actual => {
      return new Result(this, { actual, expected: this.result })
    })
  }

  toString () {
    return `resolves with ${this.result}`
  }
}
