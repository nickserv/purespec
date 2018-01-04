const Nested = require('./Nested')

module.exports = class Test extends Nested {
  constructor (subject, ...runnables) {
    super(...runnables)
    this.subject = subject
  }

  run () {
    return Nested.prototype.run.call(this, this.subject)
  }
}
