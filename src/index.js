const matchers = require('./matchers')

module.exports = {
  dsl: Object.keys(matchers).reduce((memo, matcher) => {
    const Class = matchers[matcher]
    return Object.assign({ [matcher.toLowerCase()]: (...args) => new Class(...args) }, memo)
  }, {}),
  indent: require('./indent'),
  matchers,
  results: require('./results')
}
