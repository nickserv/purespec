import * as matchers from './matchers'
import Test from './Test'

export { matchers, Test }

export function setup (target) {
  const matchersDSL = Object.keys(matchers).reduce((memo, matcher) => {
    const Class = matchers[matcher]
    memo[matcher.toLowerCase()] = (...args) => new Class(...args)
    return memo
  }, {})
  Object.assign(target || global, matchersDSL, { test })
}

export function test (name, subject, ...args) {
  return new Test(name, subject, args)
}
