'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const app = require('./lib/application')
const route = require('./lib/route')

/*
 * Expose API
 */
const API = function() {
  return Object.freeze({
    app,
    route,
  })
}

// eslint-disable-next-line new-cap
module.exports = API()
