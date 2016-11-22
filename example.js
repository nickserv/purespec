/* global test, given, rejects, resolves, returns, throws */
'use strict'
require('.').setup()
var suite

// Synchronous suite

function hello (name) {
  if (name) return `Hello, ${name}!`
  else throw new Error('Missing name.')
}

suite = test('hello',
             hello,
             given(['Nick'], returns('Hello, Nick!')),
             throws('Missing name'))
suite()

// Asynchronous suite with Promises

function helloPromise (name) {
  return new Promise(resolve => setTimeout(resolve, 1000))
    .then(() => hello(name))
}

suite = test('helloPromise',
             helloPromise,
             given(['Nick'], resolves('Hello, Nick!')),
             rejects('Missing name'))
suite()
