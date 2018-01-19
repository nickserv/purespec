/* global test, returns */

test(
  function failing () { throw new Error() },
  returns()
)
