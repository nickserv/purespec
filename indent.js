const EOL = require('os').EOL
const INDENT = ' '.repeat(2)

function mapLines (string, callback) {
  return string.split(EOL).map(callback).join(EOL)
}

function indent (string) {
  return mapLines(string, line => INDENT + line)
}

module.exports = indent
