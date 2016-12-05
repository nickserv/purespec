var os = require('os')

const INDENT = ' '.repeat(2)

module.exports = (string) => {
  return string.split(os.EOL).map(line => INDENT + line).join(os.EOL)
}
