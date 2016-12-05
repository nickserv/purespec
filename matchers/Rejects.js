import assert from 'core-assert'

export default class Rejects {
  constructor (reason) {
    this.reason = reason
  }

  run (subject) {
    return subject()
      .then(actual => assert(false))
      .catch(reason => {
        const error = reason instanceof Error ? reason : new Error(reason)
        assert.deepStrictEqual(error, new Error(this.reason))
      })
  }

  toString () {
    return `rejects with ${this.reason}`
  }
}
