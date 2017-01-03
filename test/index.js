/* eslint-env mocha */
var assert = require('assert')
var example = require('../src/example')
var purified = require('../src')
var sinon = require('sinon')

describe('purified', () => {
  describe('.Test', () => {
    var name = 'hello'
    var subject = example.hello.sync
    var given = new purified.matchers.Given(['Nick'], new purified.matchers.Returns('Hello, Nick!'))
    var throws = new purified.matchers.Throws('Missing name')
    var runnables = [given, throws]
    var test = new purified.Test(name, subject, runnables)

    describe('.prototype.constructor()', () => {
      it('returns a new Test with the given data', () => {
        assert.strictEqual(test.name, name)
        assert.strictEqual(test.subject, subject)
        assert.strictEqual(test.runnables, runnables)
      })
    })

    describe('.prototype.run()', () => {
      context('given passing tests', () => {
        it('returns a resolved Promise', () => {
          return test.run()
        })
      })

      context('given failing tests', () => {
        var sandbox
        beforeEach(() => {
          sandbox = sinon.sandbox.create()
          sandbox.stub(console, 'error')
          sandbox.stub(process, 'exit')
        })
        afterEach(() => sandbox.restore())

        var test = new purified.Test(
          'failing',
          () => { throw new Error('message') },
          [new purified.matchers.Returns()]
        )

        it('returns a rejected Promise', () => {
          return test.run().then(() => {
            sinon.assert.calledWithExactly(console.error, 'message')
            sinon.assert.calledWithExactly(process.exit, 1)
          })
        })
      })
    })

    describe('.prototype.toString()', () => {
      it('returns a nested String of the Test and its runnables', () => {
        assert.equal(test.toString(), 'hello\n  given Nick returns Hello, Nick!\n  throws Missing name')
      })
    })
  })

  describe('.dsl', () => {
    describe('()', () => {
      it('assigns properties to the given target', () => {
        var target = {}
        purified.dsl(target)
        assert.notEqual(Object.keys(target).length, 0)
      })
    })

    describe('.matchers()', () => {
      it('returns an Object of matcher shortcuts', () => {
        var matchers = Object.keys(purified.matchers)
                             .map(key => purified.matchers[key])
        var dslMatchers = purified.dsl.matchers()
        assert(typeof dslMatchers === 'object')
        assert.notEqual(Object.keys(dslMatchers).length, 0)
        Object.keys(dslMatchers).forEach(key => {
          assert(matchers.some(matcher =>
            matcher === dslMatchers[key]().constructor))
        })
      })
    })

    describe('.test()', () => {
      it('returns a new Test using the given constructor arguments', () => {
        var name = 'name'
        function subject () {}
        var given = new purified.matchers.Given()
        var returns = new purified.matchers.Returns()

        var test = new purified.Test(name, subject, [given, returns])
        assert.deepEqual(purified.dsl.test(name, subject, given, returns), test)
      })
    })
  })

  describe('.indent()', () => {
    context('given empty text', () => {
      it('returns whitespace for an indent', () => {
        assert.strictEqual(purified.indent(''), '  ')
      })
    })

    context('given a line of text', () => {
      it('returns the indented line', () => {
        assert.strictEqual(purified.indent('one'), '  one')
      })
    })

    context('given multiple lines of text', () => {
      it('returns a string with each line indented', () => {
        assert.strictEqual(purified.indent('one\ntwo'), '  one\n  two')
      })
    })

    context('given an indented line of text', () => {
      it('returns the line indented again', () => {
        assert.strictEqual(purified.indent('  one'), '    one')
      })
    })
  })

  describe('.matchers', () => {
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
})

describe('example Test suite', () => {
  it('constructs a Test', () => {
    var expected = new purified.Test(
      'hello',
      example.hello,
      [
        new purified.Test(
          '#sync()',
          example.hello.sync,
          [
            new purified.matchers.Given(
              ['Nick'],
              new purified.matchers.Returns('Hello, Nick!')
            ),
            new purified.matchers.Throws('Missing name')
          ]
        ),
        new purified.Test(
          '#promise()',
          example.hello.promise,
          [
            new purified.matchers.Given(
              ['Nick'],
              new purified.matchers.Resolves('Hello, Nick!')
            ),
            new purified.matchers.Rejects('Missing name')
          ]
        )
      ]
    )

    assert.deepStrictEqual(example.tests, expected)
  })

  it('has a string representation', () => {
    assert.strictEqual(example.tests.toString(), 'hello\n  #sync()\n    given Nick returns Hello, Nick!\n    throws Missing name\n  #promise()\n    given Nick resolves with Hello, Nick!\n    rejects with Missing name')
  })

  it('runs successfully', () => {
    example.tests.run()
  })
})
