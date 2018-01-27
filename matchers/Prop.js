const Nested = require('./Nested')

module.exports = class Prop extends Nested {
  constructor (name, ...matchers) {
    super(...matchers)
    this.name = name
  }

  run (subject) {
    return super.run(subject[this.name])
  }

  toString () {
    return `.${this.name}`
  }
}
