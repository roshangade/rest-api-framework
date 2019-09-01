'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2019 Roshan Gade
 * MIT Licensed
 */

/**
 * Request Handler
 */
const {expect} = require('chai')
const sinon = require('sinon')
const http = require('node-mocks-http')
const handler = require('./../../lib/request-handler')
const route = require('./../../lib/route')

describe('#request-handler', function() {
  it('returns request handler object', function() {
    expect(handler).to.be.an('object')
  })

  it('should not extensible', function() {
    try {
      handler.test = 1
      expect(handler).to.not.have.property('test')
    } catch (err) {
      expect(err).to.be.an('error')
    }
  })

  it('should provide execute method to handle all requests', function(done) {
    expect(handler.execute).to.be.a('function')

    const req = http.createRequest({
      method: 'GET',
      url: '/greeting',
    })
    const res = http.createResponse()

    const _middleware = sinon.spy(function(req, res) {
    })
    route.use(_middleware)

    const _route = sinon.spy(function(req, res) {
      res.json({test: 1})
    })
    route.get('/greeting', _route)

    const _error = sinon.spy(function(req, res) {
    })
    route.error(_error)

    handler.execute(req, res)
      .then(() => {
        expect(_middleware.callCount).to.be.equal(1)
        expect(_route.callCount).to.be.equal(1)
        expect(_error.callCount).to.be.equal(0)
      })
      .then(done)
      .catch(done)
  })

  it('should handle uncaught errors', function(done) {
    expect(handler.execute).to.be.a('function')

    const req = http.createRequest({
      method: 'GET',
      url: '/error',
    })
    const res = http.createResponse()

    const _middleware = sinon.spy(function(req, res) {
    })
    route.use(_middleware)

    const _route = sinon.spy(function(req, res) {
      throw Error('Uncaught error')
    })
    route.get('/error', _route)

    const _error = sinon.spy(function(req, res) {
    })
    route.error(_error)

    handler.execute(req, res)
      .then(() => {
        expect(_middleware.callCount).to.be.equal(1)
        expect(_route.callCount).to.be.equal(1)
        expect(_error.callCount).to.be.equal(1)
      })
      .then(done)
      .catch(done)
  })
})
