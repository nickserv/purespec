/* eslint-env mocha */
describe('matchers', () => {
  describe('Given', () => {
    var given = new purified.matchers.Given(['Nick'], new purified.matchers.Returns('Hello, Nick!'))

    describe('.prototype.constructor()', () => {
      it('returns a new Given with the given args and matcher', () => {
        assert.deepEqual(given.args, ['Nick'])
        assert.deepStrictEqual(given.matcher, new purified.matchers.Returns('Hello, Nick!'))
      })
    })

    describe('.prototype.run()', () => {
      it('run its matcher with its args', () => {
        given.run(example.hello.sync)
      })
    })

    describe('.prototype.toString()', () => {
      it('returns a String representation with its args and matcher', () => {
        assert.strictEqual(given.toString(), 'given Nick returns Hello, Nick!')
      })
    })
  })

  describe('Rejects', () => {
    var rejects = new purified.matchers.Rejects('Missing name')

    describe('.prototype.constructor()', () => {
      it('returns a new Rejects with the given reason', () => {
        assert.deepEqual(rejects.reason, 'Missing name')
      })
    })

    describe('.prototype.run()', () => {
      it('runs its subject as a Promise, asserting a rejection with the given reason', () => {
        return rejects.run(example.hello.promise)
      })
    })

    describe('.prototype.toString()', () => {
      it('returns a String representation with its reason', () => {
        assert.strictEqual(rejects.toString(), 'rejects with Missing name')
      })
    })
  })

  describe('Resolves', () => {
    var resolves = new purified.matchers.Given(['Nick'], new purified.matchers.Resolves('Hello, Nick!'))

    describe('.prototype.constructor()', () => {
      it('returns a new Resolves with the given result', () => {
        assert.deepEqual(resolves.matcher.result, 'Hello, Nick!')
      })
    })

    describe('.prototype.run()', () => {
      it('runs its subject as a Promise, asserting its actual result equals its expected result', () => {
        return resolves.run(example.hello.promise)
      })
    })

    describe('.prototype.toString()', () => {
      it('returns a String representation with its result', () => {
        assert.strictEqual(resolves.matcher.toString(), 'resolves with Hello, Nick!')
      })
    })
  })

  describe('Returns', () => {
    var returns = new purified.matchers.Given(['Nick'], new purified.matchers.Returns('Hello, Nick!'))

    describe('.prototype.constructor()', () => {
      it('returns a new Returns with the given result', () => {
        assert.deepEqual(returns.matcher.result, 'Hello, Nick!')
      })
    })

    describe('.prototype.run()', () => {
      it('asserts its subject\'s return value to equal its result', () => {
        returns.run(example.hello.sync)
      })
    })

    describe('.prototype.toString()', () => {
      it('returns a String representation with its result', () => {
        assert.strictEqual(returns.matcher.toString(), 'returns Hello, Nick!')
      })
    })
  })

  describe('Throws', () => {
    var throws = new purified.matchers.Throws('Missing name')

    describe('.prototype.constructor()', () => {
      it('returns a new Throws with the given exception', () => {
        assert.deepEqual(throws.exception, 'Missing name')
      })
    })

    describe('.prototype.run()', () => {
      it('asserts its subject throws an exception matching its exception', () => {
        throws.run(example.hello.sync)
      })
    })

    describe('.prototype.toString()', () => {
      it('returns a String representation with its exception', () => {
        assert.deepEqual(throws.toString(), 'throws Missing name')
      })
    })
  })
})
