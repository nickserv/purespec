const NestedMatcher = require('./NestedMatcher')

module.exports = class Test extends NestedMatcher {
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
