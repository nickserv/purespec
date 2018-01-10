const Nested = require('./Nested')

module.exports = class Test extends Nested {
  constructor (subject, ...runnables) {
    super(...runnables)
    this.subject = subject
  }

  run () {
    return super.run(this.subject)
  }

  toString () {
    return this.subject.name
  }
}
