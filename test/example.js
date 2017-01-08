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
