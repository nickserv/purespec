/* global test, given, rejects, resolves, returns, throws */
'use strict'
require('.').dsl()

exports.hello = {
  // Synchronous
  sync (name) {
    if (name) return `Hello, ${name}!`
    else throw new Error('Missing name.')
  },

  // Asynchronous with Promises
  promise (name) {
    return new Promise(setTimeout).then(() => exports.hello.sync(name))
  }
}

exports.tests = test('hello',
                     exports.hello,
                     test('#sync()',
                          exports.hello.sync,
                          given('Nick', returns('Hello, Nick!')),
                          throws('Missing name')),
                     test('#promise()',
                          exports.hello.promise,
                          given('Nick', resolves('Hello, Nick!')),
                          rejects('Missing name')))

// istanbul ignore next
if (require.main === module) {
  exports.tests.run().then(result => console.log(result.toTree()))
}
