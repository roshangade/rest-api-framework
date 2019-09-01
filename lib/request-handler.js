'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2019 Roshan Gade
 * MIT Licensed
 */
const {url} = require('./../utils')
const {middlewares, routes, exceptions} = require('./stack')

/*
 * Request Handler
 */
const RequestHandler = function() {
  /*
   * Execute all middlewares for every request
   */
  const Middlewares = async function(req, res) {
    for (let i = 0, count = middlewares.length; i < count; i++) {
      if (res.finished) break
      await (middlewares[i]).task(req, res)
    }
  }

  /*
   * Map every request with all routers and execute the function
   */
  const Routers = async function(req, res) {
    const path = req._url.pathname
    const method = req.method.toUpperCase()
    for (let i = 0, count = routes.length; i < count; i++) {
      if (res.finished) break
      const route = routes[i]
      if ((route.method === method || route.method === 'ALL') && route.pattern.test(path)) {
        (route.keys) && (req.params = url.parseParams(path, route.keys, route.pattern))
        await route.task(req, res)
      }
    }

    const e = new URIError('URL does not exists')
    e.code = 'NOT_FOUND'
    if (!res.finished) throw e
  }

  /*
   * If encounter any error while processing any request, then execute error handler function
   */
  const Exceptions = async function(err, req, res) {
    for (let i = 0, count = exceptions.length; i < count; i++) {
      if (res.finished) break
      const exception = exceptions[i]
      if ((exception.code && exception.code === err.code) || (!exception.code && !err.code)) {
        await exception.task(err, req, res)
      }
    }

    const e = !(err instanceof Error) ? new URIError(err.error) : err
    e.code = e.code || 'UNCAUGHT_ERROR'
    if (!res.finished) throw e
  }

  /*
   * Uncaught error handler
   */
  const ErrorHandler = function(err, req, res) {
    if (err.errorCode === 'NOT_FOUND') {
      return res.status(404).send({message: err.message})
    }

    // eslint-disable-next-line no-console
    if (process.env.NODE_DEBUG === 'true') console.debug(err)
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 500
    res.end('{ "message": "Internal server error" }')
  }

  return Object.freeze({

    /*
     * Execute request throughout pipeline
     */
    async execute(req, res) {
      try {
        await Middlewares(req, res)
        await Routers(req, res)
      } catch (err) {
        try {
          await Exceptions(err, req, res)
        } catch (err) {
          await ErrorHandler(err, req, res)
        }
      }
    },
  })
}

module.exports = RequestHandler()
