'use strict'

var assert = require('assert')
var Frontr = require('../')

describe('Frontr', function () {
  this.timeout(15000)

  it('should get false for empty project name', function () {
    var frontr = new Frontr()
    assert.equal(false, frontr.create())
  })

  it('should fetch to source and extract it to directory', function (done) {
    var frontr = new Frontr('my-test-app')
    frontr.create(function () {
      done()
    })
  })

})
