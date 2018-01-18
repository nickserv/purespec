const NestedMatcher = require('./NestedMatcher')

module.exports = class Prop extends NestedMatcher {
  constructor (name, ...runnables) {
    super(...runnables)
    this.name = name
  }

  run (subject) {
    return super.run(subject[this.name])
  }

  toString () {
    return `.${this.name}`
  }
}
