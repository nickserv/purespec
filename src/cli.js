#!/usr/bin/env node
const modules = process.argv.slice(2)
const load = require('./load')

function runModule (module) {
  return new Promise(resolve => resolve(load(module).run()))
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
