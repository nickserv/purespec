const fs = require('fs')
const matchers = require('./matchers')
const vm = require('vm')

const dsl =
  vm.createContext(Object.keys(matchers).reduce((memo, matcher) => {
    const Class = matchers[matcher]
    return Object.assign({ [matcher.toLowerCase()]: (...args) => new Class(...args) }, memo)
  }, {}))

module.exports = {
  dsl,
  indent: require('./indent'),
  load (filename) {
    return vm.runInContext(fs.readFileSync(filename, 'utf8'), dsl, { filename })
  },
  matchers,
  results: require('./results')
}
