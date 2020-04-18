'use strict'
/*!
 * rest-api-framework
 * Copyright(c) 2018-2020 Roshan Gade
 * MIT Licensed
 */
const http = require('http')
const {defineObjectProperty} = require('./../../utils')

/*
 * Response Handlers
 */
const response = (req, res) => {
  const send = res.end

  /*
   * Set status code
   * @param {string|number} code - Valid status code
   * @example
   * res.status(400);
   */
  defineObjectProperty(res, 'status', (code) => {
    if (http.STATUS_CODES[String(code)]) {
      res.statusMessage = http.STATUS_CODES[String(code)]
    }
    res.statusCode = code
    return res
  })

  /*
   * Convert data into string if required
   * @param {any} data - Body to send in the response
   * @param {string} encoding - Content Encoding (default: 'utf8')
   * @param {function} callback - Callback function
   */
  defineObjectProperty(res, 'json', (data, encoding, callback) => {
    if (typeof data === 'object') {
      res.setHeader('Content-Type', 'application/json')
      data = JSON.stringify(data)
    }
    return res.send.call(res, data, encoding, callback)
  })

  /*
   * Send data
   * @param {any} data - Body to send in the response
   * @param {string} encoding - Content Encoding (default: 'utf8')
   * @param {function} callback - Callback function
   */
  defineObjectProperty(res, 'send', (data, encoding, callback) => {
    send.call(res, data, encoding || 'utf8', callback)
  })
}

module.exports = response
