'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */

/*
 * URL
 */
const {expect} = require('chai')
const url = require('./../../utils/url')

describe('#url', function() {
  it('returns url object', function() {
    expect(url).to.be.an('object')
  })

  it('should not extensible', function() {
    try {
      url.test = 1
      expect(url).to.not.have.property('test')
    } catch (err) {
      expect(err).to.be.an('error')
    }
  })

  it('should provide parseUrl method', function() {
    expect(url.parseUrl).to.be.a('function')

    const _url = url.parseUrl('http://localhost:4000/greeting?user=test')

    expect(_url).to.be.an('object')
    expect(_url.pathname).to.be.equal('/greeting')
  })

  it('should provide parseQuery method', function() {
    expect(url.parseQuery).to.be.a('function')

    const _query = url.parseQuery('foo=bar&abc=xyz&abc=123')

    expect(_query).to.be.an('object')
    expect(_query.foo).to.be.equal('bar')
    expect(_query.abc).to.be.deep.equal(['xyz', '123'])
  })

  it('should provide parseParams method', function() {
    expect(url.parseParams).to.be.a('function')

    const {pattern, keys} = url.compile('/greeting/:id/:page?')
    const _params = url.parseParams('/greeting/user1', keys, pattern)

    expect(_params).to.be.an('object')
    expect(_params.id).to.be.equal('user1')
    expect(_params.page).to.be.equal(undefined)
  })

  it('should provide compile method', function() {
    expect(url.compile).to.be.a('function')

    const _data = url.compile('/greeting/:category/:page?')

    expect(_data).to.be.an('object')
    expect(_data.keys).to.be.deep.equal(['category', 'page'])
    expect(_data.pattern).to.be.deep.equal(/^\/greeting\/([^/]+?)(?:\/([^/]+?))?\/?$/i)
  })
})
