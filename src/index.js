const fs = require('fs')
const matchers = require('./matchers')
const vm = require('vm')

const dsl =
  Object.keys(matchers).reduce((memo, matcher) => {
    const Class = matchers[matcher]
    return Object.assign({ [matcher.toLowerCase()]: (...args) => new Class(...args) }, memo)
  }, {})

vm.createContext(dsl, { name: 'PureSpec' })

module.exports = {
  dsl,
  indent: require('./indent'),
  load (file) {
    return vm.runInContext(
      fs.readFileSync(file, 'utf8'),
      dsl,
      { filename: file }
    )
  },
  matchers,
  results: require('./results')
}
