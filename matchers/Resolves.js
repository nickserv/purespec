import assert from 'core-assert'

export default class Resolves {
  constructor (result) {
    this.result = result
  }

  run (subject) {
    return subject().then(actual => assert.deepStrictEqual(actual, this.result))
  }

  toString () {
    return `resolves with ${this.result}`
  }
}
