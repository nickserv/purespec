const Nested = require('./Nested')

module.exports = class Test extends Nested {
  constructor (name, subject, ...runnables) {
    super(name, ...runnables)
    this.subject = subject
  }

  run () {
    return Nested.prototype.run.call(this, this.subject)
  }
}
