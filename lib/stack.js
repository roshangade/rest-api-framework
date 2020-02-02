'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */

/*
 * Stack
 * Store all middlewares, routes and exceptions
 */
const Stack = function() {
  return Object.freeze({
    middlewares: [],
    routes: [],
    exceptions: {},
    deferred: {},
  })
}

module.exports = Stack()
