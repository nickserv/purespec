/* global test, given, rejects, resolves, returns, throws */
'use strict'
require('.').dsl()
var hello = require('./hello')

module.exports = test('hello',
                      hello,
                      test('#sync()',
                           hello.sync,
                           given('Nick', returns('Hello, Nick!')),
                           throws('Missing name')),
                      test('#promise()',
                           hello.promise,
                           given('Nick', resolves('Hello, Nick!')),
                           rejects('Missing name')))
