const purespec = require('..')
const { given, prop, returns, test } = purespec.dsl

module.exports = test(
  purespec,
  prop('ComparisonResult'),
  prop('NestedResult'),
  prop('Result'),
  prop('cli'),
  prop('dsl'),
  prop(
    'indent',
    given('', returns('  ')),
    given('one', returns('  one')),
    given('one\ntwo', returns('  one\n  two')),
    given('  one', returns('    one'))
  ),
  prop('load'),
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
  )
)
