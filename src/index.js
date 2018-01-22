const fs = require('fs')
const matchers = require('./matchers')
const promisify = require('util.promisify')
const vm = require('vm')

const readFile = promisify(fs.readFile)

const dsl =
  vm.createContext(Object.keys(matchers).reduce((memo, matcher) => {
    const Class = matchers[matcher]
    return Object.assign({ [matcher.toLowerCase()]: (...args) => new Class(...args) }, memo)
  }, {}))

module.exports = {
  dsl,
  indent: require('./indent'),
  load (filename) {
    return readFile(filename, 'utf8')
      .then(code => vm.runInContext(code, dsl, { filename }))
  },
  matchers,
  results: require('./results')
}
