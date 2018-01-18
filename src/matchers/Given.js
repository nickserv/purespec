const _ = require('lodash/fp')
const NestedMatcher = require('./NestedMatcher')

module.exports = class Given extends NestedMatcher {
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
