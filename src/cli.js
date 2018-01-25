#!/usr/bin/env node
const modules = process.argv.slice(2)
const path = require('path')

function runModule (module) {
  return Promise.resolve(require(path.resolve(module)))
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
