#!/usr/bin/env node
const modules = process.argv.slice(2)
const purespec = require('.')

function runModule (module) {
  return purespec
    .load(module)
    .then(runnable => runnable.run())
    .then(result => {
      console.log(result.toTree())
      if (result.error) process.exitCode = 1
    })
}

module.exports = Promise
  .all(modules.map(runModule))
  .catch(reason => {
    console.error(reason)
    process.exitCode = 1
  })
