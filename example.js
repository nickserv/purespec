/* global test, given, returns, throws */
Object.assign(global, require('.'))

function hello (name) {
  if (name) return `Hello, ${name}!`
  else throw new Error('Missing name.')
}

test(hello,
     given(['Nick'], returns('Hello, Nick!')),
     throws('Missing name'))
