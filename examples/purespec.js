const purespec = require('..')
const { given, prop, returns, test } = purespec.dsl

module.exports = test(
  purespec,
  prop('dsl'),
  prop(
    'indent',
    given('', returns('  ')),
    given('one', returns('  one')),
    given('one\ntwo', returns('  one\n  two')),
    given('  one', returns('    one'))
  ),
  prop(
    'matchers',
    prop('Given'),
    prop('Nested'),
    prop('Prop'),
    prop('Rejects'),
    prop('Resolves'),
    prop('Returns'),
    prop('Test'),
    prop('Throws')
  ),
  prop(
    'results',
    prop('ComparisonResult'),
    prop('NestedResult'),
    prop('Result')
  )
)
