'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const http = require('http')
const url = require('./url')
const middlewares = require('./middlewares')

const Utils = function() {
  return Object.freeze({
    url,
    middlewares,
    METHODS: http.METHODS,
    STATUS_CODES: http.STATUS_CODES,
  })
}

module.exports = Utils()
