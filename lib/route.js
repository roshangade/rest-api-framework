'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const {middlewares, routes, exceptions, deferred} = require('./stack')
const {url, METHODS} = require('./../utils')

/*
 * Router
 */
const Route = function() {
  /*
   * Register middlewares
   * @example
   * route.use((req, res) => {
   *   // do something
   * });
   */
  const Middleware = function(task) {
    if (typeof task !== 'function') {
      throw new TypeError('Route.use() requires a middleware function')
    }

    middlewares.push({task})
  }

  /*
   * Register route with method
   * Supports all methods like GET, POST, PUT, DELETE, etc.
   * @example
   * route.get('/greeting', (req, res) => {
   *   res.send('Hello World!');
   * })'
   */
  const Router = function(prefix) {
    const funcs = {};
    (['ALL', ...METHODS]).forEach((method) => {
      funcs[method.toLowerCase()] = function(path, task) {
        if (typeof path !== 'string') {
          throw new TypeError('First argument requires a string')
        }

        if (typeof task !== 'function') {
          // eslint-disable-next-line max-len
          throw new TypeError('Route.' + method.toLowerCase() + '() requires a callback function but got a ' + task)
        }

        path = (prefix || '') + path
        routes.push({
          method,
          path,
          ...url.compile(path),
          task,
        })
      }
    })

    return funcs
  }

  /*
   * Extend route with prefix
   * @example
   * let blog = route.for('/blog');
   * blog.get('/:post', (req, res) => {
   *   res.send('Lorem ipsum...');
   * })
   */
  const ExtendedRouter = function(prefix) {
    if (typeof prefix !== 'string') {
      throw new TypeError('URL prefix should be a string')
    }

    const ctx = (typeof this.prefix !== 'undefined') ? this : {}
    ctx.prefix = prefix = (ctx.prefix || '') + '/' + prefix.replace(/(^\/)|(\/$)/g, '')

    return Object.freeze({
      ...Router(prefix),
      use: function(task) {
        return this.all('/*', task)
      },
      //error: Exception,
      for: ExtendedRouter.bind(ctx),
    })
  }

  /*
   * Custom error handler on request exception
   * @example
   * route.error('NOT_FOUND', (err, req, res) => {
   *   res.status(404).send('Page NOT found.');
   * })
   */
  const Exception = function(code, task) {
    if (arguments.length === 2 && typeof code !== 'string') {
      throw new TypeError('Error code should be a string')
    }

    if (arguments.length === 1) {
      task = code
      code = undefined
    }

    if (typeof task !== 'function') {
      throw new TypeError('Route.error() requires a callback function')
    }

    exceptions[code] = task
  }

  /*
   * Custom error handler on request exception
   * @example
   * route.deferred('DELAYED_JOB', (data) => {
   *   // code goes here.
   * })
   */
  const Deferred = function(key, task) {
    if (arguments.length !== 2) {
      throw new TypeError('Deferred function should have 2 arguments')
    }

    if (typeof key !== 'string') {
      throw new TypeError('Deferred task key should be a string')
    }

    if (typeof task !== 'function') {
      throw new TypeError('Deferred task requires a callback function')
    }

    deferred[key] = task
  }

  return Object.freeze({
    use: Middleware,
    error: Exception,
    for: ExtendedRouter,
    deferred: Deferred,
    ...Router(),
  })
}

module.exports = Route()
