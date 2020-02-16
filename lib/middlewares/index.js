'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const request = require('./request')
const response = require('./response')

const Middlewares = function() {
  return Object.freeze({
    request,
    response,
  })
}

module.exports = Middlewares()
