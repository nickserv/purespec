/* global test, prop, given, returns */
var purespec = require('.')

module.exports = test(
  'purespec',
  purespec,
  prop('indent',
       given('', returns('  ')),
       given('one', returns('  one')),
       given('one\ntwo', returns('  one\n  two')),
       given('  one', returns('    one'))))
