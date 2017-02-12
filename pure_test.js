/* global test, given, returns */
var purespec = require('.')

module.exports = test(
  'purespec',
  purespec,
  test(
    '.indent()',
    purespec.indent,
    given('', returns('  ')),
    given('one', returns('  one')),
    given('one\ntwo', returns('  one\n  two')),
    given('  one', returns('    one'))))
