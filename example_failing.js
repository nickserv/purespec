/* global test, returns */
/* eslint-disable fp/no-throw */

module.exports = test('Failing example',
                      () => { throw new Error() },
                      returns())
