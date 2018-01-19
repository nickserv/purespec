/* global test, returns */

module.exports = test(
  function failing () { throw new Error() },
  returns()
)
