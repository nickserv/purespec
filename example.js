/* global test, given, returns, throws */
require('.').setup()

function hello (name) {
  if (name) return `Hello, ${name}!`
  else throw new Error('Missing name.')
}

test(hello,
     given(['Nick'], returns('Hello, Nick!')),
     throws('Missing name'))
