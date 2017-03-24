/* global test, returns */
/* eslint-disable fp/no-nil, fp/no-throw */

module.exports = test('Failing example',
                      () => { throw new Error() },
                      returns())
