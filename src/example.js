/* global test, given, returns */
'use strict'
require('./dsl')()

module.exports = test('Math.round()',
                      Math.round,
                      given(1, returns(1)),
                      given(1.5, returns(2)))

// istanbul ignore next
if (require.main === module) {
  module.exports.run().then(result => console.log(result.toTree()))
}
