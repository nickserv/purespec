const _ = require('lodash/fp')
const Nested = require('./Nested')

module.exports = class Given extends Nested {
  constructor (...args) {
    super(_.last(args))
    this.args = _.initial(args)
  }

  run (subject) {
    return super.run(_.partial(subject)(this.args))
  }

  toString () {
    return `given ${this.args}`
  }
}
