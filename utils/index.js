'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const http = require('http')
const url = require('./url')

const Utils = function() {
  return Object.freeze({
    url,
    METHODS: http.METHODS,
    STATUS_CODES: http.STATUS_CODES,
    /*
     * Define non-overridable object property
     */
    defineObjectProperty: (obj, key, value) => {
      Object.defineProperty(obj, key, {
        configurable: false,
        enumerable: false,
        writable: false,
        value,
      })
    },
  })
}

module.exports = Utils()
