const fs = require('fs')
const dsl = require('./dsl')
const vm = require('vm')

module.exports = function (file) {
  return vm.runInNewContext(
    fs.readFileSync(file),
    Object.assign({ module, require }, global, dsl),
    { filename: file }
  )
}
