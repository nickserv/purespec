#!/usr/bin/env node
var path = require('path')

var file = path.resolve(process.argv[2])
var result = require(file).run()
result.then(result => console.log(result.toTree()))
