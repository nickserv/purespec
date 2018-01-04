/* global required, prop, given, returns */

module.exports = required(
  '.',
  prop(
    'indent',
    given('', returns('  ')),
    given('one', returns('  one')),
    given('one\ntwo', returns('  one\n  two')),
    given('  one', returns('    one'))
  )
)
