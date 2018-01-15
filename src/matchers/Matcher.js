const Result = require('../Result')

module.exports = class Matcher {
  run (subject) {
    try {
      subject()
      return new Result(this)
    } catch (error) {
      return new Result(this, error)
    }
  }
}