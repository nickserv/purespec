const fs = require('fs')
const purespec = require('.')
const vm = require('vm')

const sandbox = Object.assign({ module }, purespec.dsl)
vm.createContext(sandbox, { name: 'PureSpec' })

module.exports = (file) => {
  return vm.runInContext(
    fs.readFileSync(file, 'utf8'),
    sandbox,
    { filename: file }
  )
}
