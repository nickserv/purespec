const _ = require('lodash/fp')
const fs = require('fs')
const dsl = require('./dsl')
const vm = require('vm')

module.exports = function (file) {
  return vm.runInNewContext(
    fs.readFileSync(file),
    _.assign(dsl, { module }),
    { filename: file }
  )
}
