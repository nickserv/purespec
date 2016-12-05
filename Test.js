import indentString from 'indent-string'
import os from 'os'

const INDENT_LEVEL = 2

export default class Test {
  constructor (name, subject, runnables) {
    this.name = name
    this.subject = subject
    this.runnables = runnables || []
  }

  run () {
    const promises = this.runnables.map(runnable => runnable.run(this.subject))
    return Promise.all(promises).catch(reason => {
      console.error(reason instanceof Error ? reason.message : reason)
      process.exit(1)
    })
  }

  toString () {
    const indented = this.runnables.map(runnable =>
      indentString(runnable.toString(), INDENT_LEVEL))
    return [this.name].concat(indented).join(os.EOL)
  }
}
