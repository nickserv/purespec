var _ = require('lodash/fp')
var fs = require('fs')
var dsl = require('./dsl')
var vm = require('vm')

module.exports = function (module) {
  return vm.runInNewContext(fs.readFileSync(module),
                            _.assign(dsl, { module }))
}
