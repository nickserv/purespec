#!/usr/bin/env node
const modules = process.argv.slice(2)
const purespec = require('.')

function runModule (module) {
  return purespec.load(module)
    .run()
    .then(result => console.log(result.toTree()))
}

module.exports = Promise
  .all(modules.map(runModule))
  .catch(reason => {
    console.error(reason)
    process.exit(1)
  })
