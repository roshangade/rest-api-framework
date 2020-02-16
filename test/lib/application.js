'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const http = require('node-mocks-http')

/*
 * Application
 */
const {expect} = require('chai')
const app = require('./../../lib/application')

describe('#app', function() {
  it('returns app object', function() {
    expect(app).to.be.an('object')
  })

  it('should not extensible', function() {
    try {
      app.test = 1
      expect(app).to.not.have.property('test')
    } catch (err) {
      expect(err).to.be.an('error')
    }
  })

  it('should provide set and get methods', function() {
    expect(app.set).to.be.a('function')
    expect(app.get).to.be.a('function')

    app.set('a', 1)
    expect(app.get('a')).to.equal(1)
    expect(app.get('a.b.c')).to.equal(undefined)

    try {
      app.set(undefined, 1)
    } catch (e) {
      expect(e).to.be.an.instanceof(TypeError)
      // eslint-disable-next-line max-len
      expect(e.message).to.equal('app.set() requires first argument as a string and dot(.) is not allowed')
    }

    try {
      app.set('a.b.c', 1)
    } catch (e) {
      // eslint-disable-next-line max-len
      expect(e.message).to.equal('app.set() requires first argument as a string and dot(.) is not allowed')
    }
  })
})
