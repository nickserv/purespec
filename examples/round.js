const { given, returns, test } = require('..').dsl

module.exports = test(
  Math.round,
  given(1, returns(1)),
  given(1.5, returns(2))
)
