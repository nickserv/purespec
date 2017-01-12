global.purespec = require('..')

var chai = require('chai')
global.expect = chai.expect

var sinon = require('sinon')
chai.use(require('sinon-chai'))
global.sinon = sinon
