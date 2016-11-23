# Purified
[![Build Status](https://travis-ci.org/nickmccurdy/purified.svg?branch=master)](https://travis-ci.org/nickmccurdy/purified)
[![Dependency Status](https://david-dm.org/nickmccurdy/purified.svg)](https://david-dm.org/nickmccurdy/purified)
[![devDependency Status](https://david-dm.org/nickmccurdy/purified/dev-status.svg)](https://david-dm.org/nickmccurdy/purified/?type=dev)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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

## Development
This is still very experimental, but the example above is executable and is temporarily being used in place of a real test suite.

1. Install [Node](https://nodejs.org/en/download/) 4 or later (preferred)
2. `npm install`
3. `npm test`
