'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */

/**
 * Request Listener
 */
const {expect} = require('chai')
const sinon = require('sinon')
const http = require('node-mocks-http')
const {request, response} = require('../../lib/middlewares')

let requestListener
let route

describe('#request-listener', function() {
  beforeEach(function() {
    delete require.cache[require.resolve('./../../lib/stack')]
    delete require.cache[require.resolve('./../../lib/request-listener')]
    delete require.cache[require.resolve('./../../lib/route')]
    requestListener = require('./../../lib/request-listener')
    route = require('./../../lib/route')
    route.use(request)
    route.use(response)
  })

  it('returns request listener object', function() {
    expect(requestListener).to.be.an('Function')
  })

  it('should not extensible', function() {
    //TODO: pending
  })

  it('should provide listener method', function() {
    expect(requestListener).to.be.a('function')

    const req = http.createRequest()
    const res = http.createResponse()

    try {
      requestListener(req, res)
      expect(res.statusCode).to.be.equal(200)
    } catch (e) {
      expect(e).to.be.equal(null)
    }
  })

  it('should break executing further handlers', function(done) {
    expect(requestListener).to.be.a('function')

    const req = http.createRequest({
      method: 'GET',
      url: '/m',
    })
    const res = http.createResponse()

    const _middleware = sinon.spy(function(req, res) {
      req.set('foo', 'bar')
      expect(req.get('foo')).to.be.equal('bar')
      res.writableEnded = true
    })
    route.use(_middleware)
    route.use(_middleware)

    requestListener(req, res)
      .then(() => {
        expect(_middleware.callCount).to.be.equal(1)
      })
      .then(done)
      .catch(done)
  })

  it('should provide execute method to handle all requests', function(done) {
    expect(requestListener).to.be.a('function')

    const req = http.createRequest({
      method: 'GET',
      url: '/greeting',
    })
    const res = http.createResponse()

    const _middleware = sinon.spy(function(req, res) {})
    route.use(_middleware)

    const _route = sinon.spy(function(req, res) {
      res.json({message: 'Hello World!'})
    })
    route.get('/greeting', _route)

    requestListener(req, res)
      .then(() => {
        expect(_middleware.callCount).to.be.equal(1)
        expect(_route.callCount).to.be.equal(1)
        expect(res.statusCode).to.be.equal(200)
        expect(res._headers['content-type']).to.be.equal('application/json')
        expect(res._getData()).to.be.equal('{"message":"Hello World!"}')
      })
      .then(done)
      .catch(done)
  })

  it('should handle execute for all methods of specific route(s)', function(done) {
    expect(requestListener).to.be.a('function')

    const req = http.createRequest({
      method: 'GET',
      url: '/users/foo',
    })
    const res = http.createResponse()

    const _route = sinon.spy(function(req, res) {
      expect(req.params.uid).to.be.equal('foo')
      res.status(204).end()
    })
    route.all('/users/:uid', _route)
    route.get('/users/:uid', _route) // this will not execute

    requestListener(req, res)
      .then(() => {
        expect(_route.callCount).to.be.equal(1)
        expect(res.statusCode).to.be.equal(204)
        expect(res._getData()).to.be.equal('')
        done()
      })
      //.then(done)
      .catch(done)
  })

  it('should handle uncaught errors', function(done) {
    expect(requestListener).to.be.a('function')

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

    const _error = sinon.spy(function(err, req, res) {
      res.status(422).json({message: err.message})
    })
    route.error(_error)

    requestListener(req, res)
      .then(() => {
        expect(_middleware.callCount).to.be.equal(1)
        expect(_route.callCount).to.be.equal(1)
        expect(_error.callCount).to.be.equal(1)
        expect(res.statusCode).to.be.equal(422)
        expect(res._headers['content-type']).to.be.equal('application/json')
        expect(res._getData()).to.be.equal('{"message":"Uncaught error"}')
      })
      .then(done)
      .catch(done)
  })

  it('should handle errors', function(done) {
    expect(requestListener).to.be.a('function')

    const req = http.createRequest({
      method: 'GET',
      url: '/user',
    })
    const res = http.createResponse()

    const _route = sinon.spy(function(req, res) {
      const err = TypeError('You are not authenticated.')
      err.code = 'NOT_AUTHENTICATED'
      throw err
    })
    route.get('/user', _route)

    const _error = sinon.spy(function(err, req, res) {
      res.status(401).json({message: err.message})
    })
    route.error('NOT_AUTHENTICATED', _error)
    route.error('NOT_AUTHORIZED', _error)

    requestListener(req, res)
      .then(() => {
        expect(_route.callCount).to.be.equal(1)
        expect(_error.callCount).to.be.equal(1)
        expect(res.statusCode).to.be.equal(401)
        expect(res._headers['content-type']).to.be.equal('application/json')
        expect(res._getData()).to.be.equal('{"message":"You are not authenticated."}')
      })
      .then(done)
      .catch(done)
  })

  it('should handle 404 urls', function(done) {
    expect(requestListener).to.be.a('function')

    const req = http.createRequest({
      method: 'GET',
      url: '/page-not-found',
    })
    const res = http.createResponse()

    requestListener(req, res)
      .then(() => {
        expect(res.statusCode).to.be.equal(404)
        expect(res._headers['content-type']).to.be.equal('application/json')
        expect(res._getData()).to.be.equal('{"message":"URL does not exists"}')
      })
      .then(done)
      .catch(done)
  })

  it('should handle uncaught exception', function(done) {
    expect(requestListener).to.be.a('function')

    const req = http.createRequest({
      method: 'GET',
      url: '/',
    })
    const res = http.createResponse()

    const _route = sinon.spy(function(req, res) {
      // eslint-disable-next-line no-undef
      a
      res.send('unreached')
    })
    route.get('/', _route)

    requestListener(req, res)
      .then(() => {
        expect(res.statusCode).to.be.equal(500)
        expect(res._headers['content-type']).to.be.equal('application/json')
        expect(res._getData()).to.be.equal('{ "message": "Internal server error" }')
      })
      .then(done)
      .catch(done)
  })

  it('should handle deferred tasks', function(done) {
    expect(requestListener).to.be.a('function')

    const req = http.createRequest({
      method: 'GET',
      url: '/',
    })
    const res = http.createResponse()

    const _route = sinon.spy(function(req, res) {
      req.defer('foo', 'bar')
      req.defer('foo', 'bar')
      // eslint-disable-next-line no-undef
      res.send('Hello world!')
    })

    const _deferredTask = sinon.spy(function(data) {
      expect(data).to.be.equal('bar')
    })
    route.get('/', _route)
    route.deferred('foo', _deferredTask)

    requestListener(req, res)
      .then(() => {
        expect(res.statusCode).to.be.equal(200)
        expect(res._getData()).to.be.equal('Hello world!')
        expect(_deferredTask.callCount).to.be.equal(2)
      })
      .then(done)
      .catch(done)
  })

  it('should reset deferred tasks', function(done) {
    expect(requestListener).to.be.a('function')

    const req = http.createRequest({
      method: 'GET',
      url: '/',
    })
    const res = http.createResponse()

    const _route = sinon.spy(function(req, res) {
      req.defer('foo', 'bar')
      req.defer('foo', 'bar')
      // eslint-disable-next-line no-undef
      res.send('Hello world!')
      req.deferred.reset()
    })

    const _deferredTask = sinon.spy(function(data) {
      expect(data).to.be.equal('bar')
    })
    route.get('/', _route)
    route.deferred('foo', _deferredTask)

    requestListener(req, res)
      .then(() => {
        expect(res.statusCode).to.be.equal(200)
        expect(res._getData()).to.be.equal('Hello world!')
        expect(_deferredTask.callCount).to.be.equal(0)
      })
      .then(done)
      .catch(done)
  })

  it('should should log an error of deferred task', function(done) {
    expect(requestListener).to.be.a('function')

    const req = http.createRequest({
      method: 'GET',
      url: '/',
    })
    const res = http.createResponse()
    sinon.stub(console, 'error')
    const _route = sinon.spy(function(req, res) {
      req.defer('foo', 1)
      req.defer('bar', 2)
      // eslint-disable-next-line no-undef
      res.send('Hello world!')
    })

    const _deferredTask1 = sinon.spy(function(data) {
      expect(data).to.be.equal(1)
    })

    const _deferredTask2 = sinon.spy(function(data) {
      expect(data).to.be.equal(2)
      throw new Error('dummy')
    })

    route.get('/', _route)
    route.deferred('foo', _deferredTask1)
    route.deferred('bar', _deferredTask2)

    requestListener(req, res)
      .then(() => {
        expect(res.statusCode).to.be.equal(200)
        expect(res._getData()).to.be.equal('Hello world!')
        expect(_deferredTask1.callCount).to.be.equal(1)
        expect(_deferredTask2.callCount).to.be.equal(1)
        // eslint-disable-next-line no-console
        expect( console.error.calledOnce ).to.be.equal(true)
      })
      .then(done)
      .catch(done)
  })
})
