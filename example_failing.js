/* global test, returns */

module.exports = test('Failing example',
                      () => { throw new Error() },
                      returns())
