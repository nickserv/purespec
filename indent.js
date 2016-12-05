import os from 'os'

const INDENT = ' '.repeat(2)

export default function indent (string) {
  return string.split(os.EOL).map(line => INDENT + line).join(os.EOL)
}
