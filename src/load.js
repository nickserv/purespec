var _ = require('lodash/fp')
var fs = require('fs')
var dsl = require('./dsl')
var vm = require('vm')

module.exports = function (file) {
  return vm.runInNewContext(fs.readFileSync(file),
                            _.assign(dsl, { module }))
}
