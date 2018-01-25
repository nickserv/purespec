const Nested = require('./Nested')

module.exports = class Given extends Nested {
  constructor (...args) {
    super(args[args.length - 1])
    this.args = args.slice(0, -1)
  }

  run (subject) {
    return super.run(subject.bind(null, ...this.args))
  }

  toString () {
    return `given ${this.args}`
  }
}
