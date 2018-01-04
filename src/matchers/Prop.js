const Test = require('./Test')

module.exports = class Prop extends Test {
  constructor (name, ...runnables) {
    super(`.${name}`, null, ...runnables)
  }
}
