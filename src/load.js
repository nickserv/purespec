const fs = require('fs')
const dsl = require('./dsl')
const vm = require('vm')

module.exports = function (file) {
  return vm.runInNewContext(
    fs.readFileSync(file, 'utf8'),
    Object.assign({ module, require }, global, dsl),
    { filename: file }
  )
}
