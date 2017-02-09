var Result = require('../Result')

module.exports = class Returns {
  constructor (result) {
    this.result = result
  }

  run (subject) {
    return new Result(this, { actual: subject(), expected: this.result })
  }

  toString () {
    return `returns ${this.result}`
  }
}
