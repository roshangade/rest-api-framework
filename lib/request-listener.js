'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const {url} = require('./../utils')
const {middlewares, routes, exceptions, deferred} = require('./stack')

/*
 * Listener for all request events
 */
const RequestListener = function() {
  /*
   * Execute all middlewares for every request
   */
  const Middlewares = async function(req, res) {
    for (let i = 0, count = middlewares.length; i < count; i++) {
      if (res.writableEnded) break
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
      if (res.writableEnded) break
      const route = routes[i]
      if ((route.method === method || route.method === 'ALL') && route.pattern.test(path)) {
        if (route.keys && !Object.keys(req.params).length) {
          Object.assign(req.params, url.parseParams(path, route.keys, route.pattern))
        }
        await route.task(req, res)
      }
    }

    if (!res.writableEnded) {
      const e = new URIError('URL does not exists')
      e.code = 'NOT_FOUND'
      throw e
    }
  }

  /*
   * If encounter any error while processing any request, then execute error handler function
   */
  const Exceptions = async function(err, req, res) {
    if (res.writableEnded) return
    if (err && err.code && exceptions[err.code]) {
      await exceptions[err.code](err, req, res)
    } else if (err && !err.code && exceptions[undefined]) {
      await exceptions[undefined](err, req, res)
    }

    const e = !(err instanceof Error) ? new URIError(err.error) : err
    e.code = e.code || 'UNCAUGHT_ERROR'
    if (!res.writableEnded) throw e
  }

  /*
   * Uncaught error handler
   */
  const ErrorHandler = function(err, req, res) {
    if (res.writableEnded) return

    if (err.code === 'NOT_FOUND') {
      return res.status(404).json({message: err.message})
    }

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 500
    res.end('{ "message": "Internal server error" }')

    // eslint-disable-next-line no-console
    if (process.env.NODE_DEBUG === 'true') console.debug(err)
  }

  /*
   * Execute registered deferred tasks for every request
   * //TODO: provide more options
   */
  const DeferredTasks = async function(req) {
    for (const {key, data} of req._deferred_tasks || []) {
      try {
        if (!deferred[key]) {
          throw new Error(`No such task found: '${key}'`)
        }
        await deferred[key](data)
      } catch (err) {
        // eslint-disable-next-line no-console,max-len
        console.error(`${(new Date()).toISOString()} Failed to run "${key}" job due to an error: ${err.message}`)
        // eslint-disable-next-line no-console
        if (process.env.NODE_DEBUG === 'true') console.debug(err)
      }
    }
  }

  const Listener = async function(req, res) {
    try {
      await Middlewares(req, res)
      await Routers(req, res)
    } catch (err) {
      try {
        await Exceptions(err, req, res)
      } catch (err) {
        await ErrorHandler(err, req, res)
      }
    } finally {
      await DeferredTasks(req)
    }
  }

  return function() {
    return Listener
  }()
}

module.exports = RequestListener()
