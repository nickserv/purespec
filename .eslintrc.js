const purespec = require('.')

module.exports = {
  extends: "./package.json",
  globals: Object.keys(purespec.dsl).reduce((memo, name) =>
    Object.assign({ [name]: false}, memo)
  )
}
