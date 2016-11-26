'use strict'
var fs = require('fs')
var path = require('path')

module.exports = fs.readdirSync(__dirname)
                   .map(file => path.basename(file, '.js'))
                   .filter(file => file !== 'index')
                   .reduce((memo, matcher) => {
                     memo[matcher] = require(`./${matcher}`)
                     return memo
                   }, {})
