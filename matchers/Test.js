const Nested = require('./Nested')

module.exports = class Test extends Nested {
  constructor (subject, ...matchers) {
    super(...matchers)
    this.subject = subject
  }

  run () {
    return super.run(this.subject)
  }

  toString () {
    return this.subject.name || this.subject.toString()
  }
}
