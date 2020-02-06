'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const url = require('./../url')

/*
 * Parse URL and Query
 */
const request = (req, res) => {
  req._url = url.parseUrl(req.url)
  req.query = url.parseQuery(String(req._url.query))
  req.params = {}

  // Data Carrier
  req._ctx_data = {}

  /*
   * Set value that is used to cary throughout the request
   * @param {string} key - It represents the data variable
   * @param {any} value - Data to store
   * @example
   * req.set('apiVersion', 'v3');
   * req.set('foo', 'bar')
   */
  req.set = (key, value) => {
    req._ctx_data[key] = value
  }

  /*
   * Get value that is already set before in the request execution
   * @param {string} key - It represents the data variable
   * @returns {any} - Value i.e. stored along with key
   * @example
   * req.get('apiVersion');
   * req.get('foo')
   */
  req.get = (key) => req._ctx_data[key]

  // deferred tasks
  req._deferred_tasks = []

  /*
   * Deferred task(s) name along with data
   * @param {string} key - name of the deferred task
   * @param {any} data - value that required to execute deferred task
   * @example
   * req.defer('LOG', {url: req.url, method: req.method})
   * req.defer('STATS', {client: req.get('client_uid'), category: 1})
   */
  req.defer = (key, data) => {
    req._deferred_tasks.push({key, data})
  }

  req.deferred = {
    /*
     * Reset the registered deferred task(s) of that specific request
     */
    reset: () => {
      req._deferred_tasks = []
    },
  }
}

module.exports = request
