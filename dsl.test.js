const dsl = require('./dsl')
const matchers = require('./matchers')

describe('dsl', () => {
  it('is a non-empty Object', () => {
    expect(dsl).toBeInstanceOf(Object)
    expect(dsl).not.toEqual({})
  })

  it('includes matcher shortcuts', () => {
    expect(Object.keys(dsl).reduce((memo, matcher) => {
      return Object.assign({
        [matcher[0].toUpperCase() + matcher.substr(1)]: dsl[matcher]().constructor
      }, memo)
    }, {})).toEqual(matchers)
  })
})
