global.purespec = require('..')

var chai = require('chai')
global.assert = chai.assert

var sinon = require('sinon')
sinon.assert.expose(chai.assert, { prefix: '' })
global.sinon = sinon
