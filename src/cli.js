#!/usr/bin/env node
const modules = process.argv.slice(2)
const purespec = require('..')

function runModule (module) {
  return purespec.load(module)
    .run()
    .then(result => console.log(result.toTree()))
    .catch(reason => {
      console.error(reason instanceof Error ? reason.message : reason)
      process.exit(1)
    })
}

module.exports = Promise.all(modules.map(runModule))
