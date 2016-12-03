'use strict'
var path = require('path')

function requireNamespace (requireContext) {
  return requireContext.keys().reduce((memo, key) => {
    memo[path.basename(key, '.js')] = requireContext(key)
    return memo
  }, {})
}

module.exports = requireNamespace(require.context('.', false, /\/(?!index)/))
