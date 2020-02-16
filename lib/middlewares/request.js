'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const {url, defineObjectProperty} = require('./../../utils')

/*
 * Parse URL and Query
 */
const request = (req, res) => {
  // Required: used to mapped routes against given handler
  defineObjectProperty(req, '_url', url.parseUrl(req.url))

  // Parse query into object
  defineObjectProperty(req, 'query', url.parseQuery(String(req._url.query)))

  // Set params
  defineObjectProperty(req, 'params', {})

  // Required: used to carry data throughout the request
  defineObjectProperty(req, '_ctx_data', {})

  /*
   * Set value that is used to cary throughout the request
   * @param {string} key - It represents the data variable
   * @param {any} value - Data to store
   * @example
   * req.set('apiVersion', 'v3');
   * req.set('foo', 'bar')
   */
  defineObjectProperty(req, 'set', (key, value) => {
    req._ctx_data[key] = value
  })

  /*
   * Get value that is already set before in the request execution
   * @param {string} key - It represents the data variable
   * @returns {any} - Value i.e. stored along with key
   * @example
   * req.get('apiVersion');
   * req.get('foo')
   */
  defineObjectProperty(req, 'get', (key) => req._ctx_data[key])


  // Required: used to store deferred tasks of the request
  defineObjectProperty(req, '_deferred_tasks', [])

  /*
   * Deferred task(s) name along with data
   * @param {string} key - name of the deferred task
   * @param {any} data - value that required to execute deferred task
   * @example
   * req.defer('LOG', {url: req.url, method: req.method})
   * req.defer('STATS', {client: req.get('client_uid'), category: 1})
   */
  defineObjectProperty(req, 'defer', (key, data) => {
    req._deferred_tasks.push({key, data})
  })

  defineObjectProperty(req, 'deferred', Object.freeze({
    /*
     * Reset the registered deferred task(s) of that specific request
     */
    reset: () => {
      while (req._deferred_tasks.length) {
        req._deferred_tasks.pop()
      }
    },
  }))
}

module.exports = request
