const _ = require('lodash/fp')
const fs = require('fs')
const matchers = require('./matchers')
const vm = require('vm')

const dsl = _.flow(
  _.mapKeys(_.toLower),
  _.mapValues(Class => (...args) => new Class(...args))
)(matchers)

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
