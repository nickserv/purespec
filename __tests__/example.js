describe('example Test suite', () => {
  it('constructs a Test', () => {
    var expected = new purespec.Test(
      'hello',
      example.hello,
      [
        new purespec.Test(
          '#sync()',
          example.hello.sync,
          [
            new purespec.matchers.Given(
              'Nick',
              new purespec.matchers.Returns('Hello, Nick!')
            ),
            new purespec.matchers.Throws('Missing name')
          ]
        ),
        new purespec.Test(
          '#promise()',
          example.hello.promise,
          [
            new purespec.matchers.Given(
              'Nick',
              new purespec.matchers.Resolves('Hello, Nick!')
            ),
            new purespec.matchers.Rejects('Missing name')
          ]
        )
      ]
    )

    expect(example.tests).toEqual(expected)
  })

  it('has a string representation', () => {
    expect(example.tests.toTree()).toBe('hello\n  #sync()\n    given Nick\n      returns Hello, Nick!\n    throws Missing name\n  #promise()\n    given Nick\n      resolves with Hello, Nick!\n    rejects with Missing name')
  })
})
