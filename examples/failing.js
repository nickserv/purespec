const { returns, test } = require('..').dsl

module.exports = test(
  function failing () { throw new Error() },
  returns()
)
