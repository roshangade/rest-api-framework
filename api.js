'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const app = require('./lib/application')
const route = require('./lib/route')
const requestListener = require('./lib/request-listener')
const {request, response} = require('./lib/middlewares')

/*
 * Expose API
 */
const API = function() {
  // load default middlewares
  route.use(request)
  route.use(response)

  return Object.freeze({
    app,
    route,
    requestListener,
  })
}

// eslint-disable-next-line new-cap
module.exports = API()
