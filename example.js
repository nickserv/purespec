/* global test, given, rejects, resolves, returns, throws */
'use strict'
require('.').setup()

var hello = {
  // Synchronous
  sync (name) {
    if (name) return `Hello, ${name}!`
    else throw new Error('Missing name.')
  },

  // Asynchronous with Promises
  promise (name) {
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => hello.sync(name))
  }
}

var suite

// Synchronous suite
suite = test('hello.sync',
             hello.sync,
             given(['Nick'], returns('Hello, Nick!')),
             throws('Missing name'))
suite()

// Asynchronous suite with Promises
suite = test('hello.promise',
             hello.promise,
             given(['Nick'], resolves('Hello, Nick!')),
             rejects('Missing name'))
suite()
