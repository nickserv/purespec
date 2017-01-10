# PureSpec
[![Build Status](https://travis-ci.org/nickmccurdy/purespec.svg?branch=master)](https://travis-ci.org/nickmccurdy/purespec)
[![Coverage Status](https://coveralls.io/repos/github/nickmccurdy/purespec/badge.svg?branch=master)](https://coveralls.io/github/nickmccurdy/purespec?branch=master)
[![Dependency Status](https://david-dm.org/nickmccurdy/purespec.svg)](https://david-dm.org/nickmccurdy/purespec)
[![devDependency Status](https://david-dm.org/nickmccurdy/purespec/dev-status.svg)](https://david-dm.org/nickmccurdy/purespec/?type=dev)

A declarative test framework for pure JavaScript.

## [Example](./example.js)
This executable example is meant to showcase what PureSpec tests will look like, and it also doubles as an integration test.

## Status
__Experimental.__ There is a unit test suite so it should be at least somewhat stable, but it may undergo frequent redesigns and API breakages.

## Development
1. Install [Node](https://nodejs.org/en/download/) 6 or later (preferred).
2. `npm install`
3. `npm run watch`

## Contributing
- Use [JavaScript Standard Style](http://standardjs.com/). The test commands will run a compliant linter for you.
- Keep compatability with the Node engine versions (see `package.json`).
- Maintain test coverage for existing code and add at least partial unit tests for new code.
