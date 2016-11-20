/* global test, given, returns, throws */
'use strict'
require('.').setup()

function hello (name) {
  if (name) return `Hello, ${name}!`
  else throw new Error('Missing name.')
}

var suite = test('hello',
                 hello,
                 given(['Nick'], returns('Hello, Nick!')),
                 throws('Missing name'))
suite()
