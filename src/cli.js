#!/usr/bin/env node
var modules = process.argv.slice(2)
var purespec = require('..')

function runModule (module) {
  return purespec.load(module)
    .run()
    .then(result => console.log(result.toTree()))
}

module.exports = Promise.all(modules.map(runModule))
