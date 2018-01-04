/* global test, returns */

module.exports = test(
  () => { throw new Error() },
  returns()
)
