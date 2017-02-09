#!/usr/bin/env node
var modules = process.argv.slice(2)
var path = require('path')

function runModule (module) {
  return require(path.resolve(module))
    .run()
    .then(result => console.log(result.toTree()))
}

module.exports = Promise.all(modules.map(runModule))
