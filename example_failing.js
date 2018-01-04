/* global test, returns */
/* eslint-disable fp/no-nil, fp/no-throw */

module.exports = test(
  () => { throw new Error() },
  returns()
)
