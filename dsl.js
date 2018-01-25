const matchers = require('./matchers')

module.exports = Object.keys(matchers).reduce((memo, matcher) => {
  const Class = matchers[matcher]
  return Object.assign({ [matcher.toLowerCase()]: (...args) => new Class(...args) }, memo)
}, {})
