'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const route = require('./route')
const handler = require('./request-handler')
const {middlewares} = require('./../utils')
const {request, response} = middlewares

/*
 * Application
 */
const Application = function() {
  const config = {}

  // load default middlewares
  route.use(request)
  route.use(response)

  return Object.freeze({
    /*
     * Setter method
     */
    set(key, value) {
      if (typeof key !== 'string' || ~key.indexOf('.')) {
        // eslint-disable-next-line max-len
        throw new TypeError('app.set() requires first argument as a string and dot(.) is not allowed')
      }

      Object.defineProperty(config, key, {
        configurable: true,
        writable: true,
        value,
      })
    },

    /*
     * Getter method
     */
    get(key) {
      try {
        return key.split('.').reduce((val, key) => val[key], config)
      } catch (e) {
        // nothing to do here.
      }

      return undefined
    },

    /*
     * Request listener
     */
    listener(...args) {
      return handler.execute.apply(null, args)
    },
  })
}

module.exports = Application()
