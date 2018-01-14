const fs = require('fs')
const dsl = require('./dsl')
const vm = require('vm')

const sandbox = Object.assign({ module, require }, global, dsl)
vm.createContext(sandbox, { name: 'PureSpec' })

module.exports = (file) => {
  return vm.runInContext(
    fs.readFileSync(file, 'utf8'),
    sandbox,
    { filename: file }
  )
}
