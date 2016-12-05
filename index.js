import * as matchers from './matchers'
import Test from './Test'

export { matchers, Test }

export function setup (target) {
  var matchersDSL = Object.keys(matchers).reduce((memo, matcher) => {
    var Class = matchers[matcher]
    memo[matcher.toLowerCase()] = (arg1, arg2) => new Class(arg1, arg2)
    return memo
  }, {})
  Object.assign(target || global, matchersDSL, { test })
}

export function test (name, subject) {
  return new Test(name, subject, Array.from(arguments).slice(2))
}
