# Purified
[![Build Status](https://travis-ci.org/nickmccurdy/purified.svg?branch=master)](https://travis-ci.org/nickmccurdy/purified)

A declarative test framework for pure JavaScript.

## [Example](./example.js)
```js
function hello (name) {
  if (name) return `Hello, ${name}!`
  else throw new Error('Missing name.')
}

test(hello,
     given(['Nick'], returns('Hello, Nick!')),
     throws('Missing name'))
```
