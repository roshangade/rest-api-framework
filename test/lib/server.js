'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */

/**
 * Server
 */
const {expect} = require('chai')
const http = require('node-mocks-http')
const server = require('./../../lib/server')
const EventEmitter = require('events')

describe('#server', function() {
  it('returns server object', function() {
    expect(server).to.be.an.instanceof(EventEmitter)
  })

  it('should have listen property', function() {
    expect(server).to.have.property('listen')
    expect(server.listen).to.be.an('function')
  })

  it('should listen for request event', function(done) {
    const req = http.createRequest({
      method: 'GET',
      url: '/',
    })
    const res = http.createResponse()
    server.emit('request', req, res)
    setTimeout(() => {
      expect(res.statusCode).to.be.equal(404)
      expect(res._headers['content-type']).to.be.equal('application/json')
      expect(res._getData()).to.be.equal('{"message":"URL does not exists"}')
      done()
    },100)
  })

})
