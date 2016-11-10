var purified = require('.')

function hello (name) {
  if (name) return `Hello, ${name}!`
  else throw new Error('Missing name.')
}

purified.assertMany(hello, new Map([
  [['Nick'], { return: 'Hello, Nick!' }],
  [[], { exception: new Error('Missing name.') }]
]))
